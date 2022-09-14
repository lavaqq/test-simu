import { useState, useMemo } from 'react';

export default function Hypo() {
    const [loanAmount, setLoanAmount] = useState(150000);
    const [annualRate, setAnnualRate] = useState(5);
    const [loanDuration, setLoanDuration] = useState(10);
    const getMonthlyPayment = (loanAmount, loanDuration) => {
        return (loanAmount * annualRate / 100 / 12) / (1 - (1 + annualRate / 100 / 12) ** (-loanDuration));
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
        if (e.target.value >= 0 && e.target.value <= 1000000) {
            setLoanAmount(e.target.value);
        }
    }
    const handleLoanDurationChange = (e) => {
        setLoanDuration(e.target.value);
    }
    const monthlyPayment = useMemo(() => getMonthlyPayment(loanAmount, loanDuration), [loanAmount, loanDuration, annualRate]);
    const interest = useMemo(() => getInterest(loanAmount, monthlyPayment, loanDuration), [loanAmount, monthlyPayment, loanDuration]);
    const total = useMemo(() => getTotal(loanAmount, interest), [loanAmount, interest]);
    return (
        <div className='flex flex-col gap-6 px-5'>
            <h1 className='text-xl font-bold underline'>Simulateur PH</h1>
            <div className='grid grid-cols-2 gap-y-2 gap-x-8'>
                <label htmlFor="loan-amount">Montant du prêt</label>
                <input className="bg-gray-200 rounded-sm p-1" type="number" min="0" max="1000000" step="10000" id="loan-amount" value={loanAmount} onChange={handleLoanAmountChange} />
                <label htmlFor="annual-rate">Taux annuel</label>
                <input className="bg-gray-200 rounded-sm p-1" type="number" min="1" max="9.99" step="0.01" id="annual-rate" value={annualRate} onChange={handleAnnualRateChange} />
                <label htmlFor="loan-duration">Durée du prêt (en années)</label>
                <select className="bg-gray-200 rounded-sm p-1" name="loan-duration" id="loan-duration" value={loanDuration} onChange={handleLoanDurationChange}>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                </select>
            </div>
            <hr className='border-gray-400' />
            <div className='grid grid-cols-2 gap-y-2 gap-x-8'>
                <span>Montant emprunté</span>
                <span>{loanAmount}€</span>
                <span>Le taux débiteur</span>
                <span>{annualRate}%</span>
                <span>Durée de remboursement</span>
                <span>{loanDuration} ans</span>
                <span>Mensualité</span>
                <div className='flex flex-col'>
                    <span>{(monthlyPayment / 12).toFixed(2)}€/mois</span>
                    <span className='text-sm text-gray-500'>
                        (soit {monthlyPayment.toFixed(2)}€ par an)
                    </span>
                </div>
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