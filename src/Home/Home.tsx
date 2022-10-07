import React, { useState, useEffect } from 'react';
import { Container, Breadcrumb } from 'semantic-ui-react';
import Checkout from '../Checkout';
import Navigation from '../Navigation';
import Order from '../Order';

const sections = [
    { key: 'Order', content: 'Order', link: true },
    { key: 'Checkout', content: 'Checkout', link: true },
    { key: 'Confirmation', content: 'Confirmation'},
  ]

const stages = ['order', 'detail', 'confirmation'];



const Home = () => {
    const [ currentStageIndex, setCurrentStageIndex ] = useState(0)
    const [ stickerType, setStickerType ] = useState('');
    const [ stickerQty, setStickerQty] = useState('');
    const [ isNextDisabled, setIsNextDisabled ] = useState(false);
    const [ isBackDisabled, setIsBackDisabled ] = useState(false);
    const [breadcrumbSections, setActiveBreadcrumbSection] = useState(sections)

    const onNext = () => {
        setCurrentStageIndex(currentStageIndex + 1)
    }

    const onBack = () => {
        setCurrentStageIndex(currentStageIndex - 1)
    }

    const onChangeStickerType = (value: string) => {
        setStickerType(value)
    }

    const onChangeStickerQty = (value: string) => {
        setStickerQty(value)
    }

    useEffect(() => {
        setIsNextDisabled(currentStageIndex === stages.length - 1 || stickerType === '' || stickerQty === '0' || stickerQty == '')
        setIsBackDisabled(currentStageIndex === 0)
    }, [currentStageIndex, stickerQty, stickerType])

    useEffect(()=> {
        const sectionsWithActive = sections.map((section, i) => {
            if(i === currentStageIndex) {
                return {
                    ...section, 
                    active: true,
                }
            }
            return section
        })
        setActiveBreadcrumbSection(sectionsWithActive)
    }, [currentStageIndex])


    const getStep = () => {
        switch (currentStageIndex) {
            case 0:
                return (
                    <Order
                        onChangeStickerType={onChangeStickerType}
                        stickerType={stickerType}
                        stickerQty={parseInt(stickerQty)}
                        onChangeStickerQty={onChangeStickerQty}
                    /> 
                )
            case 1: 
                    return (
                        <Checkout/>
                    )
        }
    }

    return (
        <>
            <Container textAlign='center' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', width: '500px'}}>
                <Container>
                    <Breadcrumb size='big' icon='right arrow' sections={breadcrumbSections} style={{marginBottom: '50px'}} />
                    {getStep()}
                    <Navigation
                        onBack={onBack}
                        onNext={onNext}
                        backDisabled={isBackDisabled}
                        nextDisabled={isNextDisabled}
                    />
                </Container>
            </Container>
        </>

        // next should be disabled until 
    );
}

export default Home;