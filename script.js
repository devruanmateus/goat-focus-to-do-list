// Evento que permite a visualização completa do texto digitado quando selecionado pelo usuário.
document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar eventos de quebra de linha ao focar e desfocar
    function addTextWrapEvents(textElements) {
        textElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.remove('no-wrap');
                element.classList.add('wrap');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('wrap');
                element.classList.add('no-wrap');
            });
        });
    }

    // Adicionar eventos de quebra de linha aos textos já existentes
    addTextWrapEvents(document.querySelectorAll('.editableText'));

    // Função criada para adicionar eventos que permitem remover uma tarefa
    function addRemoveEvent(taskElement) {
        taskElement.querySelector(".remove-task").addEventListener("click", function() {
            // Impede de remover a primeira tarefa da coluna
            if (taskElement.closest('.col-tasks').querySelectorAll(".task").length > 1) {
                taskElement.remove();
            }
        });
    }

    // Função para adicionar uma nova tarefa à coluna onde o botão foi clicado
    function addTask(event) {
        const buttonClicked = event.currentTarget;
        const colTasks = buttonClicked.closest('.col-tasks'); // Encontra a coluna onde o botão foi clicado
        const taskTemplate = colTasks.querySelector(".task").cloneNode(true); 

        taskTemplate.querySelectorAll(".editableText").forEach(function(element) {
            element.innerHTML = ""; // Limpa o conteúdo da nova tarefa
        });

        taskTemplate.querySelector(".remove-task").style.display = "inline"; 
        addRemoveEvent(taskTemplate); 
        addTextWrapEvents(taskTemplate.querySelectorAll('.editableText')); 

        colTasks.querySelector(".add-tasks").before(taskTemplate);
    }

    // Adiciona evento de clique para adicionar tarefas em todos os botões
    document.querySelectorAll("#addTaskButton").forEach(button => {
        button.addEventListener("click", addTask);
    });

    // Função com evento de remoção à coluna
    function addRemoveColEvent(colElement) {
        colElement.querySelector('.remove-col').addEventListener('click', function () {
            const allCols = document.querySelectorAll('.col-tasks');
            if (allCols.length > 1) { // Só remove se houver mais de uma coluna
                colElement.remove();
                
                // Verifica o número de colunas
                if (allCols.length <= 4) {
                    document.querySelector('.btn-add-col').style.display = 'block';
                }
            }
        });
    }

    // Modifique a função addCol para incluir a chamada de addRemoveColEvent
    function addCol() {
        const colTemplate = document.querySelector(".col-tasks").cloneNode(true);
        const container = document.querySelector('#content-container');

        const firstTask = colTemplate.querySelector('.task');
        colTemplate.querySelectorAll('.task').forEach((task, index) => {
            if (index > 0) task.remove();
        });
        
        firstTask.querySelectorAll(".editableText").forEach(function(element) {
            element.innerHTML = ""; 
        });

        addTextWrapEvents(firstTask.querySelectorAll('.editableText'));
        addRemoveEvent(firstTask);

        // Adiciona o evento de remoção à nova coluna
        addRemoveColEvent(colTemplate);

        container.insertBefore(colTemplate, document.querySelector('#add-col'));
        const allCol = container.querySelectorAll('.col-tasks').length;

        colTemplate.querySelector('#addTaskButton').addEventListener('click', addTask);

        if (allCol >= 4) {
            document.querySelector('.btn-add-col').style.display = 'none';
        }
    }

    // Certifique-se de adicionar o evento de remoção às colunas já existentes
    document.querySelectorAll('.col-tasks').forEach(col => {
        addRemoveColEvent(col);
    });

    document.querySelector('.btn-add-col').addEventListener('click', addCol);
    
    // Adiciona o evento de alteração do tema da página
    document.querySelector('#alter-theme').addEventListener('click', function() {
        let body = document.querySelector('body')
        let header = document.querySelector('header')
        let iconTheme = document.querySelector('#theme')
        let headCols = document.querySelectorAll('.head-col')
        let headTasks = document.querySelectorAll('.head-task')
        let texts = document.querySelectorAll('.text-theme')
        let btns = document.querySelectorAll('button')
        let iconRemoveTask = document.querySelectorAll('.remove-task')
    
        if (body.style.backgroundColor == 'white') {
            // Estilo do corpo da página
            body.style.backgroundColor = '#1B1B1B'
            // Estilo do cabeçário da página
            header.style.backgroundColor = '#1B1B1B'
            header.style.color = '#CDCDCD'
            iconTheme.style.color = '#CDCDCD'
    
            iconRemoveTask.forEach(icon => icon.style.color = 'white')
            headCols.forEach(col => col.style.backgroundColor = '#313131') 
            headTasks.forEach(task => task.style.backgroundColor = '#313131') 
            texts.forEach(text => text.style.color = '#CDCDCD') 
            btns.forEach(btn => {
                btn.style.backgroundColor = '#313131'
                btn.style.color = '#CDCDCD'
            })
        } else {
            body.style.backgroundColor = 'white'
            header.style.backgroundColor = 'black'
            header.style.color = 'white'
    
            iconRemoveTask.forEach(icon => icon.style.color = 'black')
            headCols.forEach(col => col.style.backgroundColor = 'black') 
            headTasks.forEach(task => task.style.backgroundColor = 'lightgray') 
            texts.forEach(text => text.style.color = 'black')
            btns.forEach(btn => {
                btn.style.backgroundColor = 'white'
                btn.style.color = 'black'
            })
        }
    })
});
