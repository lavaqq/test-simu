import { useState } from 'react';

export default function Personnel() {
    const [loanAmount, setLoanAmount] = useState(15000);
    const [annualRate, setAnnualRate] = useState(6.95);
    const [loanDuration, setLoanDuration] = useState(12);
    const getPeriodicalRate = (annualRate) => {
        return (1 + annualRate / 100) ** (1 / 12) - 1;
    }
    const getMonthlyPayment = (loanAmount, periodicalRate, loanDuration) => {
        return roundToUpperSecondDecimal(loanAmount * periodicalRate * (1 + periodicalRate) ** loanDuration / ((1 + periodicalRate) ** loanDuration - 1));
    }
    const getTotalInterest = (loanAmount, monthlyPayment, loanDuration) => {
        return roundToUpperSecondDecimal(monthlyPayment * loanDuration - loanAmount);
    }
    const roundToUpperSecondDecimal = (number) => {
        return Math.round(number * 100) / 100;
    }
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold underline'>Simulateur PAT (non-simplifié)</h1>
            <div className='grid grid-cols-2'>
                <label htmlFor="loan-amount">Montant du prêt</label>
                <input type="number" min="0" max="50000" id="loan-amount" value={loanAmount} onChange={
                    (e) => {
                        if (e.target.value >= 0 && e.target.value <= 50000) {
                            setLoanAmount(e.target.value);
                        }
                    }
                } />
                <label htmlFor="annual-rate">Taux annuel</label>
                <input type="number" min="1" max="9.99" id="annual-rate" value={annualRate} onChange={
                    (e) => {
                        if (e.target.value >= 1 && e.target.value <= 9.99) {
                            setAnnualRate(e.target.value);
                        }
                    }
                } />
                <label htmlFor="loan-duration">Durée du prêt</label>
                <select name="loan-duration" id="loan-duration" onChange={(e) => setLoanDuration(e.target.value)}>
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
            <div className='grid grid-cols-2 gap-1'>
                <span>Montant emprunté</span>
                <span>{loanAmount}€</span>
                <span>Durée de remboursement</span>
                <span>{loanDuration} mois</span>
                <span>Le taux débiteur</span>
                <span>{annualRate}%</span>
                <span>TAEG</span>
                <span>{annualRate}%</span>
                <span>Montant total avec taux</span>
                <div className='flex flex-col'>
                    <span>{(getTotalInterest(loanAmount, getMonthlyPayment(loanAmount, getPeriodicalRate(annualRate), loanDuration), loanDuration) + loanAmount)}€</span>
                    <span className='text-sm text-gray-500'>({loanAmount}€ + {getTotalInterest(loanAmount, getMonthlyPayment(loanAmount, getPeriodicalRate(annualRate), loanDuration), loanDuration)}€)</span>
                </div>
                <span>Mensualité</span>
                <span>{getMonthlyPayment(loanAmount, getPeriodicalRate(annualRate), loanDuration)}€/mois</span>
            </div>
        </div>
    );
}