import { computed, ref, watchEffect } from 'vue'

import { useGenres } from '@/composables/useGenres'
import { useLang } from '@/composables/useLang'
import { useModal } from '@/composables/useModal'
import type { Exhibitor, GenreID } from '@/types'

import { useStatusDisplay } from './useStatusDisplay'

import {
  useExhibitorData,
  useExhibitorListTransformer,
  useExhibitorProfile,
  useFavorites,
  useGenreFilter,
  useHeading,
  useStateFavorite,
  useStateGenres,
  useStateKeyword,
  useStateOverseas,
  useStateSort,
} from './index'

type ConfirmFn = (message: string) => boolean

export type ExhibitorsPageProps = {
  listSrc: string
  genreSrc: string
  favoriteKey: string
}

export const useExhibitorsPage = (props: ExhibitorsPageProps, confirmRemove: ConfirmFn) => {
  const { lang, isJapanese } = useLang()

  const { exhibitions, exhibitionsMap, genresMap, genreLists, getGenreNameFromID, allGenreCount } =
    useGenres(props.genreSrc)

  const { rawExhibitorList, numRawExhibitorList, isLoading, error, load } = useExhibitorData(
    props.listSrc,
    lang.value,
    getGenreNameFromID,
  )

  const { stateSort, updateStateSort, sortLabel, updateSortToOrder, updateSortToKoma } =
    useStateSort()

  const { stateKeyword, removeStateKeyword } = useStateKeyword()

  const { stateFavorite } = useStateFavorite()

  const { stateGenres, updateStateGenres, removeStateGenres } = useStateGenres()
  const didInitStateGenres = ref(false)
  watchEffect(() => {
    if (didInitStateGenres.value) return
    const all = Object.keys(genresMap.value ?? {}) as GenreID[]
    if (all.length === 0) return
    updateStateGenres(all)
    didInitStateGenres.value = true
  })

  const {
    stateOverseas,
    isAllStateOverseas,
    isDomesticActive,
    isOverseasActive,
    addStateOverseas,
    removeStateOverseas,
    clearStateOverseas,
  } = useStateOverseas()

  const { myFavorites, numMyFavorites, switchFavorite, includedFavorites } = useFavorites(
    props.favoriteKey,
    lang.value,
    confirmRemove,
  )

  const { exhibitorList, numExhibitorList } = useExhibitorListTransformer(rawExhibitorList, {
    favorite: stateFavorite,
    myFavorites: myFavorites,
    genres: stateGenres,
    overseas: stateOverseas,
    keyword: computed(() => (stateKeyword.value ? stateKeyword.value : undefined)),
    sort: stateSort,
  })

  const { getHeading, showHeading } = useHeading(exhibitorList, stateSort)

  const modal = useModal()
  const { currentExhibitor, setCurrentExhibitor, resetCurrentExhibitor } =
    useExhibitorProfile(exhibitionsMap)

  const showModal = (exhibitor: Exhibitor) => {
    setCurrentExhibitor(exhibitor, lang.value)
    modal.show()
  }
  const dismissModal = () => {
    resetCurrentExhibitor()
    modal.dismiss()
  }

  const filterModal = useModal()

  const { isGenreOn, setGenreOn, updateGenreFlags, exhibitionOptions } = useGenreFilter(
    exhibitions,
    genresMap,
    stateGenres,
    updateStateGenres,
    lang.value,
  )

  const { statusList } = useStatusDisplay({
    isJapanese,
    stateKeyword,
    removeStateKeyword,
    stateGenres,
    allGenreCount,
    removeStateGenres,
    getGenreNameFromID,
    isAllStateOverseas,
    isOverseasActive,
    isDomesticActive,
    clearStateOverseas,
  })

  return {
    // lang
    lang,
    isJapanese,

    // genres data
    exhibitions,
    exhibitionsMap,
    genresMap,
    genreLists,
    getGenreNameFromID,
    allGenreCount,

    // exhibitor data
    rawExhibitorList,
    numRawExhibitorList,
    isLoading,
    error,
    load,

    // user state
    stateSort,
    updateStateSort,
    sortLabel,
    updateSortToOrder,
    updateSortToKoma,

    stateKeyword,
    removeStateKeyword,

    stateFavorite,

    stateGenres,
    updateStateGenres,
    removeStateGenres,

    stateOverseas,
    isAllStateOverseas,
    isDomesticActive,
    isOverseasActive,
    addStateOverseas,
    removeStateOverseas,
    clearStateOverseas,

    // favorites
    myFavorites,
    numMyFavorites,
    switchFavorite,
    includedFavorites,

    // transformed list
    exhibitorList,
    numExhibitorList,

    // headings
    getHeading,
    showHeading,

    // modals
    visible: modal.visible,
    show: modal.show,
    dismiss: modal.dismiss,
    currentExhibitor,
    showModal,
    dismissModal,

    visibleFilterModal: filterModal.visible,
    showFilterModal: filterModal.show,
    dismissFilterModal: filterModal.dismiss,

    // filter ui model
    isGenreOn,
    setGenreOn,
    updateGenreFlags,
    exhibitionOptions,

    // status display
    statusList,
  }
}
