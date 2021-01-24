export const accordion_html =`
<table class="history-table">
    <thead id="accordionId" class="accordion">
        <tr>
            <th colspan="6" id="historySettingsIdthead">
                <div id="historySettingsId">
                    <div id="accordionHeadingIdContainer">
                        <h2 id="accordionHeadingId">History</h2>
                    </div>
                    <form method="POST" id="accordionFormId">
                        <h2>Account:</h2>
                        <select name="accountNoIdSelect" id="accountNoIdSelect">
                                <option value="All" selected>All</option>
                        </select>
                        <h2>Transaction:</h2>
                        <select name="transactionTypeIdSelect" id="transactionTypeIdSelect">
                                <option value="All" selected>All</option>
                                <option value="Deposited">Deposits</option>
                                <option value="withdrew">Withdraws</option>
                                <option value="Sent">Sent</option>
                                <option value="Received">Received</option>
                                <option value="Created">Account Created</option>
                        </select>
                        <!-- <input type="submit" value="Go"> -->
                    </form>
                    <div id="accordionSymbol">+</div>
                </div>
            </th>
        </tr>
    </thead>
    <tbody class="panel" id="accordionPanelId" >
        <tr>
            <th>Action</th>
            <th>Account #</th>
            <th>Date</th>
            <th class="right-align">Amount (PHP)</th>
            <th class="right-align">Balance (PHP)</th>
            <th>Status</th>
        </tr>
    </tbody>
</table>
`

export const initial_tr_html =`
<tr>
    <th>Action</th>
    <th>Account #</th>
    <th>Date</th>
    <th class="right-align">Amount (PHP)</th>
    <th class="right-align">Balance (PHP)</th>
    <th>Status</th>
</tr>
`