import { ref, computed, watchEffect, onMounted } from 'vue'
import { useJson } from '@/utils/useJson'
import { useFavoriteExhibitors } from '@/composables/useFavoriteExhibitors.js'
import { useString } from '@/utils/useText.js'
import type { Lang } from '@/types/lang'
import type { Exhibitor, Genre, SortType, ExhibitionName } from '@/types/exhibitorList'

export const useExhibitorList = (lang: Lang, listSrc: string, genresSrc: string) => {
  // JSONから取得した全出展社
  const exhibitorsAll = ref<Exhibitor[]>([])

  // フィルターやソートをした後の出展社
  const exhibitors = ref<Exhibitor[]>([])

  // 出展社の件数
  const allLength = computed<number>(() => {
    return exhibitorsAll.value ? exhibitorsAll.value.length : 0
  })
  const length = computed<number>(() => {
    return exhibitors.value ? exhibitors.value.length : 0
  })

  // 表示する条件（ソート）
  const stateSort = ref<SortType>()
  const setSort = (type: SortType) => {
    stateSort.value = type
  }

  // 表示する条件（展示会）
  const stateExhibition = ref<ExhibitionName[]>(['nexpo', 'gwpe'])
  const switchExhibition = (name: ExhibitionName) => {
    if (stateExhibition.value.includes(name)) {
      const index = stateExhibition.value.indexOf(name)
      stateExhibition.value.splice(index, 1)
    } else {
      stateExhibition.value.push(name)
    }
  }

  // 表示する条件（キーワード）
  const stateKeyword = ref<string>()

  // お気に入り機能
  const stateFavorite = ref<boolean>(false)
  const switchStateFavorite = () => {
    stateFavorite.value = !stateFavorite.value
    if (stateFavorite.value) {
      stateExhibition.value = ['nexpo', 'gwpe']
      stateKeyword.value = undefined
    }
  }
  const { myFavorites, getFavoriteItems, switchFavorite } = useFavoriteExhibitors()
  onMounted(() => {
    getFavoriteItems()
  })

  // ジャンル
  const genres = ref<Genre[]>()

  // JSONファイルを取得してリストをセット
  onMounted(async () => {
    const json = await useJson(listSrc)
    genres.value = await useJson(genresSrc)
    exhibitorsAll.value = await updateExhibitorsAll(json)
  })

  // 全出展社リストの更新関数
  const updateExhibitorsAll = (array: unknown[]): Exhibitor[] => {
    const result = []
    for (const item of array) {
      const shapingItem = changeObj(item)

      if (lang === 'ja' && shapingItem.name) {
        result.push(shapingItem)
      } else if (shapingItem.nameEng) {
        result.push(shapingItem)
      }
    }

    return result
  }

  // JSONから取得したオブジェクトの整形関数
  const changeObj = (value: any): Exhibitor | undefined => {
    if (!value) return

    return {
      id: value.id,
      koma: value.koma,
      genre: convertGenre(value.genre, 'ja'),
      genreEng: convertGenre(value.genre, 'en'),
      exhibition: value.exhibition,
      overseas: value.overseas,
      name: value.name,
      nameEng: value.nameEng,
      order: value.order,
      orderEng: value.orderEng,
      webSite: value.webSite,
      contents: value.contents,
      contentsEng: value.contentsEng,
      categories: value.categories,
      categoriesEng: value.categoriesEng,
      sdgs: value.sdgs
    }
  }

  // ジャンルを記号から文字列に変換する関数
  const convertGenre = (value: string, lang: Lang): string | undefined => {
    if (!genres.value) return undefined

    for (const genre of genres.value) {
      if (value === genre.id) {
        switch (lang) {
          case 'ja':
            return genre.name
          default:
            return genre.nameEng
        }
      }
    }
  }

  // 表示する出展社の演算
  watchEffect(() => {
    // フィルター
    exhibitors.value = exhibitorsAll.value.filter((exhibitor) => {
      return [
        filterExhibition(exhibitor.exhibition),
        filterKeyword(
          [
            exhibitor.genre,
            exhibitor.genreEng,
            exhibitor.name,
            exhibitor.nameEng,
            exhibitor.contents,
            exhibitor.contentsEng,
            exhibitor.categories[0],
            exhibitor.categories[1],
            exhibitor.categories[2],
            exhibitor.categoriesEng[0],
            exhibitor.categoriesEng[1],
            exhibitor.categoriesEng[2]
          ].join('・')
        ),
        filterFavorite(exhibitor.id)
      ].every((value) => value === true)
    })

    // ソート
    exhibitors.value.sort((a, b) => {
      if (stateSort.value === 'name') {
        return a.order > b.order ? 1 : -1
      } else if (stateSort.value === 'nameEng') {
        return a.orderEng > b.orderEng ? 1 : -1
      } else {
        return a.koma > b.koma ? 1 : -1
      }
    })
  })

  // フィルターの関数
  const { katakanaToHiragana } = useString()

  const filterExhibition = (value: string) => {
    return stateExhibition.value.includes(value)
  }
  const filterKeyword = (value: string) => {
    if (stateKeyword.value) {
      const keyword = katakanaToHiragana(stateKeyword.value.toLowerCase())
      const subject = katakanaToHiragana(value.toLowerCase())

      const result = subject.indexOf(keyword)
      return result !== -1
    } else {
      return true
    }
  }
  const filterFavorite = (id: string) => {
    if (stateFavorite.value) {
      return myFavorites.value.includes(id)
    } else {
      return true
    }
  }

  return {
    exhibitors,
    allLength,
    length,
    stateSort,
    sort: setSort,
    stateExhibition,
    switchExhibition,
    stateKeyword,
    genres,
    stateFavorite,
    switchStateFavorite,
    myFavorites,
    switchFavorite
  }
}
