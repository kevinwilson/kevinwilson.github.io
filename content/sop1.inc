<h1>SOP 1</h1>
<p>SOP text</p>

<sop-process src="process1"></sop-process>



<sop-process src="process3"></sop-process>

<p>More SOP text</p>

<style>
    ol { counter-reset: item }
    ol li { display: block }
    ol li:before { content: counters(item, ".") " "; counter-increment: item }
</style>

<ol>
    <li>li element
        <ol>
            <li>sub li element</li>
            <li>sub li element</li>
            <li>sub li element</li>
        </ol>
    </li>
    <li>li element</li>
    <li>li element
        <ol>
            <li>sub li element</li>
            <li>sub li element</li>
            <li>sub li element</li>
        </ol>
    </li>
</ol>

<sop-process src="process2"></sop-process>

<button class="mdc-button mdc-button--raised" onclick="closeSop();">
    <span class="mdc-button__ripple"></span> 
    Close document 
</button>

