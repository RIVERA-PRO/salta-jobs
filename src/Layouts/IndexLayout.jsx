import React from 'react'
import Header from '../Pages/Header/Header'
import HeroPage from '../Pages/HeroPage/HeroPage'
import ButonScroll from '../Components/ButonScroll/ButonScroll'
export default function IndexLayout() {
    return (
        <div>
            <Header />
            <HeroPage />
            <ButonScroll />
        </div>
    )
}
