import React, { useContext, useEffect, useState } from 'react'

import { allCreditCards } from '../../api/credit_cards'
import BaseLayout from '../../components/BaseLayout'
import AppContext from '../../context/AppContext'

const CreditCards = () => {
  const [creditCards, setCreditCards] = useState([])
  const { setLoading } = useContext(AppContext)

  useEffect(() => {
    setLoading(true)

    allCreditCards()
      .then(response => {
        const { status, data } = response

        if (status === 200) {
          setCreditCards(data)
        }
      })
      .finally(() => setLoading(false))
  }, [setLoading])

  return (
    <BaseLayout>
      {creditCards}
    </BaseLayout>
  )
}

export default CreditCards
