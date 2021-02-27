import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function GoogleAdsense() {
  const adsense = useSelector<RootState, boolean>(
    (state) => state.settings.adsense,
  )
  useEffect(() => {
    if (window && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({})
      } catch (e) {
        console.error(e)
      }
    }
  }, [])
  return (
    <>
      {adsense ? (
        <ins
          style={{ display: 'block' }}
          data-ad-client={process.env.REACT_APP_AD_CLIENT}
          data-ad-slot={process.env.REACT_APP_AD_SLOT}
          data-ad-layout={'in-article'}
          data-ad-layout-key={''}
          data-ad-format={'auto'}
          data-full-width-responsive={false}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default GoogleAdsense
