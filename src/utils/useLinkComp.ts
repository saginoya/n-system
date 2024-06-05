export const useLinkComp = () => {
  // リンクのタイプによって異なるコンポーネントをかえす
  const linkCompName = {
    internal: 'n-link-internal',
    external: 'n-link-external',
    doc: 'n-link-doc'
  }
  const getLinkCompName = (key: string | undefined): string => {
    if (key === 'internal' || key === 'external' || key === 'doc') {
      return linkCompName[key]
    } else {
      return 'span'
    }
  }

  return {
    getLinkCompName
  }
}
