import { useState, useMemo } from 'react';

export default function PAT() {
    const [loanAmount, setLoanAmount] = useState(15000);
    const [annualRate, setAnnualRate] = useState(6.95);
    const [loanDuration, setLoanDuration] = useState(12);
    const getPeriodicalRate = (annualRate) => {
        return (1 + annualRate / 100) ** (1 / 12) - 1;
    }
    const getMonthlyPayment = (loanAmount, periodicalRate, loanDuration) => {

        return loanAmount * periodicalRate * (1 + periodicalRate) ** loanDuration / ((1 + periodicalRate) ** loanDuration - 1);
    }
    const getInterest = (loanAmount, monthlyPayment, loanDuration) => {
        return monthlyPayment * loanDuration - loanAmount;
    }
    const getTotal = (loanAmount, interest) => {
        return parseFloat(loanAmount) + parseFloat(interest);
    }
    const handleAnnualRateChange = (e) => {
        if (e.target.value >= 1 && e.target.value <= 9.99) {
            setAnnualRate(e.target.value);
        }
    }
    const handleLoanAmountChange = (e) => {
        if (e.target.value >= 0 && e.target.value <= 50000) {
            setLoanAmount(e.target.value);
        }
    }
    const handleLoanDurationChange = (e) => {
        setLoanDuration(e.target.value);
    }
    const periodicalRate = useMemo(() => getPeriodicalRate(annualRate), [annualRate]);
    const monthlyPayment = useMemo(() => getMonthlyPayment(loanAmount, periodicalRate, loanDuration), [loanAmount, periodicalRate, loanDuration]);
    const interest = useMemo(() => getInterest(loanAmount, monthlyPayment, loanDuration), [loanAmount, monthlyPayment, loanDuration]);
    const total = useMemo(() => getTotal(loanAmount, interest), [loanAmount, interest]);
    return (
        <div className='flex flex-col gap-6 px-5'>
            <h1 className='text-xl font-bold underline'>Simulateur PAT (non-simplifié)</h1>
            <div className='grid grid-cols-2 gap-y-2 gap-x-8'>
                <label htmlFor="loan-amount">Montant du prêt</label>
                <input className="bg-gray-200 rounded-sm p-1" type="number" min="0" max="50000" step="1000" id="loan-amount" value={loanAmount} onChange={handleLoanAmountChange} />
                <label htmlFor="annual-rate">Taux annuel</label>
                <input className="bg-gray-200 rounded-sm p-1" type="number" min="1" max="9.99" step="0.01" id="annual-rate" value={annualRate} onChange={handleAnnualRateChange} />
                <label htmlFor="loan-duration">Durée du prêt (en mois)</label>
                <select className="bg-gray-200 rounded-sm p-1" name="loan-duration" id="loan-duration" value={loanDuration} onChange={handleLoanDurationChange}>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                    <option value="60">60</option>
                    <option value="72">72</option>
                    <option value="84">84</option>
                    <option value="96">96</option>
                    <option value="108">108</option>
                    <option value="120">120</option>
                </select>
            </div>
            <hr className='border-gray-400' />
            <div className='grid grid-cols-2 gap-y-2 gap-x-8'>
                <span>Montant emprunté</span>
                <span>{loanAmount}€</span>
                <span>Le taux débiteur</span>
                <span>{annualRate}%</span>
                <span>TAEG</span>
                <span>{annualRate}%</span>
                <span>Taux périodique</span>
                <span>{loanDuration} mois</span>
                <span>Mensualité</span>
                <span>{monthlyPayment.toFixed(2)}€/mois</span>
                <span>Montant total</span>
                <div className='flex flex-col'>
                    <span>{total.toFixed(2)}€</span>
                    <span className='text-sm text-gray-500'>
                        (dont {interest.toFixed(2)}€ d'intérêts)
                    </span>
                </div>
            </div>
        </div>
    );
}