import React, { useState, useContext, useEffect } from 'react';

import { daoConstants } from '../../content/summon-presets';
import { SummonContext } from '../../contexts/SummonContext';
import { Web3Context } from '../../contexts/ContractContexts';
import SummonStepOne from '../../components/summon/SummonStepOne';
import HardModeForm from '../../components/summon/HardModeForm';
import SummonStepTwo from '../../components/summon/SummonStepTwo';
import SummonStepThree from '../../components/summon/SummonStepThree';
import BoostPackages from '../../components/boosts/BoostPackages';
import MiniLoader from '../../components/loading/MiniLoader';

import './Summon.scss';

const Summon = () => {
  const [web3context] = useContext(Web3Context);
  const [hardMode, setHardMode] = useState(false);
  const [daoData, setDaoData] = useState(daoConstants);
  const [isSummoning, setIsSummoning] = useState(true);
  const [currentStep, setCurrentStep] = useState(4);
  const { state, dispatch } = useContext(SummonContext);

  console.log('state', state);

  const stepContent = {
    1: 'What kind of haus will you build?',
    2: 'Give us the basics',
    3: 'Last chance to make changes',
    4: 'Our magic internet communities take a minute or two to create.',
  };

  const handleSummon = () => {
    setCurrentStep(4);
    setIsSummoning(true);

    //todo: pass to summon service

    console.log('summoning HERE', daoData);
  };

  return (
    <>
      {web3context && web3context.account ? (
        <>
          <div className="Summon__hero">
            <h1>SUMMON</h1>
          </div>

          <div className="View">
            <div className="Row">
              <div className="Summon__step">
                {currentStep > 4 ? <h3>Step {currentStep}</h3> : null}
                <p>{stepContent[currentStep]}</p>
              </div>
              {currentStep > 4 ? <button>Get Help</button> : null}
            </div>

            {!isSummoning ? (
              <>
                {!hardMode ? (
                  <>
                    {currentStep === 1 ? (
                      <SummonStepOne
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                      />
                    ) : null}

                    {currentStep === 2 ? (
                      <SummonStepTwo
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                      />
                    ) : null}

                    {currentStep === 3 ? (
                      <SummonStepThree
                        daoData={daoData}
                        setDaoData={setDaoData}
                        setCurrentStep={setCurrentStep}
                        handleSummon={handleSummon}
                      />
                    ) : null}

                    <p>
                      I'm a DAO master, take me to the{' '}
                      <span
                        className="mode-link"
                        onClick={() => setHardMode(true)}
                      >
                        hard mode
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <HardModeForm
                      daoData={daoData}
                      setDaoData={setDaoData}
                      handleSummon={handleSummon}
                    />
                    <p>
                      Take me back to{' '}
                      <span
                        className="mode-link"
                        onClick={() => setHardMode(false)}
                      >
                        fun mode.
                      </span>
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <MiniLoader txHash={state.summonTx} />
                <p>While you wait checkout our boosts</p>
                <BoostPackages isSummoning={isSummoning} />
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Summon;
