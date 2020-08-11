// REUSABLE APP! -> creates a dropdown menu in the HTML file -> root is the element that the autocomplete should be rendered into
const createAutoComplete = ({
    root, 
    renderOption, 
    onOptionSelect, 
    inputValue, 
    fetchData 
}) => { 
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async event => {
        const items = await fetchData(event.target.value);

        // so when you search and delete dropdown disappears
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        // so when you enter an input and delete it there's no rests of the dropdown
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for(let item of items) {
            const option = document.createElement('a');

            // adds class dropdown-item -> bulma class for item in a dropdown
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            // so when you click outside the dropdown it disappears -> create the option so when you click on the input it reappears!!!
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            resultsWrapper.appendChild(option);
        }
    };
    input.addEventListener('input', debounce(onInput, 500));

    document.addEventListener('click', event => {
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    });
}