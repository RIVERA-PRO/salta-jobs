import React from 'react'
import Header from '../Pages/Header/Header'
import HeroPage from '../Pages/HeroPage/HeroPage'
import ButonScroll from '../Components/ButonScroll/ButonScroll'
import FooterPage from '../Pages/FooterPage/FooterPage'
import JobsPage from '../Pages/JobsPage/JobsPage'
import FormDestinos from '../../src/Components/FormDestinos/FormDestinos'
import FormSeller from '../../src/Components/FormSeller/FormSeller'
export default function IndexLayout() {
    return (
        <div>
            <Header />
            <HeroPage />
            <JobsPage />
            <FormDestinos />
            <FormSeller />
            <FooterPage />
            <ButonScroll />
        </div>
    )
}
