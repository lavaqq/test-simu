import { useState } from 'react';

export default function Hypo() {
    const [loanAmount, setLoanAmount] = useState(150000);
    const [annualRate, setAnnualRate] = useState(8.95);
    const [loanDuration, setLoanDuration] = useState(10);

    const getMonthlyPayment = (loanAmount, loanDuration) => {
        return roundToUpperSecondDecimal((loanAmount * annualRate / 100 / 12) / (1 - (1 + annualRate / 100 / 12) ** (-loanDuration)));
    }
    const getTotalInterest = (loanAmount, monthlyPayment, loanDuration) => {
        return roundToUpperSecondDecimal(monthlyPayment * loanDuration - loanAmount);
    }
    const roundToUpperSecondDecimal = (number) => {
        return Math.round(number * 100) / 100;
    }
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold underline'>Simulateur PH</h1>
            <div className='grid grid-cols-2'>
                <label htmlFor="loan-amount">Montant du prêt</label>
                <input type="number" min="0" max="1000000" id="loan-amount" value={loanAmount} onChange={
                    (e) => {
                        if (e.target.value >= 0 && e.target.value <= 1000000) {
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
            <div className='grid grid-cols-2 gap-1'>
                <span>Montant emprunté</span>
                <span>{loanAmount}€</span>
                <span>Durée de remboursement</span>
                <span>{loanDuration} mois</span>
                <span>Le taux débiteur</span>
                <span>{annualRate}%</span>
                <span>Montant total avec taux</span>
                <div className='flex flex-col'>
                    <span>{getTotalInterest(loanAmount, getMonthlyPayment(loanAmount, loanDuration), loanDuration) + loanAmount}€</span>
                    <span className='text-sm text-gray-500'>({loanAmount}€ + {getTotalInterest(loanAmount, getMonthlyPayment(loanAmount, loanDuration), loanDuration)}€)</span>
                </div>
                <span>Mensualité</span>
                <span>{getMonthlyPayment(loanAmount, loanDuration)}€/mois</span>
            </div>
        </div>
    );
}