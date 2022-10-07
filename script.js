let command = document.getElementById('command')
let container = document.getElementById('container');
let cmd = document.getElementById('cmd');

cmd.onkeydown = (e) => {
    let token = localStorage.getItem('history');
    if(token === null) return;
    let cache = JSON.parse(token);
    
    token = localStorage.getItem('pos');
    let pos = cache.length;    
    if(token !== null) pos = JSON.parse(token);  
    
    if (pos < 0) pos = -1;
    if (pos >= cache.length) pos = cache.length ;

    switch(e.key) {
        case "ArrowUp" : {
            e.preventDefault();
            pos > 0 && (cmd.value = cache[--pos]);
            break;
        }
        case "ArrowDown" : {
            e.preventDefault();
            pos < cache.length-1 && (cmd.value = cache[++pos]);
            break;
        }
        default : break;
    }

    localStorage.setItem('pos',pos);
}

document.onmousedown = (e)=>{
    e.preventDefault();
}

command.addEventListener(('submit'),(e)=>{
    e.preventDefault();

    let input = cmd.value;
    if(input === "") return;
    
    let command_input = document.createElement('p');

    command_input.innerHTML = `<span>> </span>${input}`;
    container.appendChild(command_input);
    
    let out = process(input);
    container.appendChild(out);

    document.getElementById('cmd').value = '';
})

let process = (input) => {
    let out = document.createElement('p');
    const token = localStorage.getItem('history');
    let cache = [];
    if(token !== null) cache = JSON.parse(token);
    cache.push(input);

    switch(input){
        case "--help": {
            out.innerHTML = "Wait for it ...";
            out.classList.add('out');
            break;
        }
        case "clear": {
            container.innerHTML = "";
            break;
        }
        case "add": {
            const id = addDocument('users',{
                name:"harami",
                sex:"M",
                age: 69
            });
            out.innerHTML = `Document added with id : <span style="color: var(--bg-light)">${id}</span>`;
            out.classList.add('out');
            break;
        }
        case "get":{
            getDocument('users');
            break;
        }
        default : {
            out.innerHTML = 'Invalid command. See a list of all commands using <span style="color: var(--bg-light)">--help</span> command ...';
            out.classList.add('err','out');
            break;
        }
    }
    localStorage.setItem('history',JSON.stringify(cache));
    return out;
}