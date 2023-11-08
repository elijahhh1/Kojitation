import Heading from '@/Components/Heading'
import Heroes from '@/Components/Heroes'
import { Button } from '@/Components/ui/button'
import Layout from '@/Layouts/WelcomeLayout'
import { PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export const APP_NAME = `${import.meta.env.VITE_APP_NAME}`

const Welcome = () => {
    const {pss_choices,pss_questions,questionnaire_choices,questionnaire_questions} = usePage<PageProps>().props;

    useEffect(()=>{
        console.log([
            {pss_choices:pss_choices},
            {pss_questions:pss_questions},
            {questionnaire_choices:questionnaire_choices},
            {questionnaire_questions:questionnaire_questions},
        ]);
    },[])

    return (
        <>
            <Head title={`Welcome to ${APP_NAME}`} />
            <Layout>
                <div className='min-h-full flex flex-col '>
                    <div className='relative flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-5 py-9'>
                        <Heading />
                        <Heroes />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Welcome
