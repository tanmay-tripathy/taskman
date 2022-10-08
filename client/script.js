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

command.onsubmit = async (e)=>{
    e.preventDefault();

    let input = cmd.value;
    if(input === "") return;
    
    let command_input = document.createElement('p');

    command_input.innerHTML = `<span>> </span>${input}`;
    container.appendChild(command_input);
    cmd.value = '';

    command.style = 'visibility: hidden;';
    const out = await process(input);
    container.appendChild(out);
    console.log('append out');
    command.style = 'visibility: visible;';    
    cmd.focus();
}

let process = async (input) => {
    let out = document.createElement('div');
    out.classList.add('out');
    const token = localStorage.getItem('history');
    let cache = [];
    if(token !== null) cache = JSON.parse(token);
    cache.push(input);

    const inputs = input.split(" ");
    console.log(inputs);
    switch(inputs[0]){
        case "--help": {
            out.innerHTML = "Wait for it ...";
            break;
        }
        case "clear": {
            container.innerHTML = "";
            break;
        }
        // case "add": {
        //     const id = addDocument('users',{
        //         name:"harami",
        //         sex:"M",
        //         age: 69
        //     });
        //     out.innerHTML = `Document added with id : <span style="color: var(--bg-light)">${id}</span>`;
        //     out.classList.add('out');
        //     break;
        // }
        case "get":{
            const url = `http://localhost:3000/read/${inputs[1]}`;
            
            try {
                const response = await fetch(url);
                const docs = await response.json();
                let table = document.createElement('table');
                let tr = document.createElement('tr');
                tr.innerHTML = '<th>Name</th><th>Sex</th><th>Age</th>';
                table.appendChild(tr);
                docs.forEach(data => {
                    tr = document.createElement('tr');
                    tr.innerHTML = `<td>${data.name}</td><td>${data.sex}</td><td>${data.age}</td>`;
                    table.appendChild(tr);
                });
                out.appendChild(table);
            } catch (error) {
                out.innerHTML = error;
                out.classList.add('err');
            }
            break;
        }
        default : {
            out.innerHTML = 'Invalid command. See a list of all commands using <span style="color: var(--bg-light)">--help</span> command ...';
            out.classList.add('err');
            break;
        }
    }
    localStorage.setItem('history',JSON.stringify(cache));
    return out;
}