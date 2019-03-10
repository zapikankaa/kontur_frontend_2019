const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { showTodo } = require('./show');
const { sortImp, sortDate, sortUser } = require('./sort');

app();

function app() {
    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getFileNames() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    let fileNames = [];
    for (let i = 0; i < filePaths.length; i++) {
        const firstLetter = filePaths[i].lastIndexOf('/');
        const name = filePaths[i].substring(firstLetter + 1);
        fileNames.push(name);
    }
    return fileNames;
}

function processCommand(command) {
    const comments = collectComments();
    let attribute;
    if (command.indexOf('user ') == 0) {
        attribute = command.substring(5);
        attribute = new RegExp(attribute + '.*', 'i');
        command = 'user';
    }
    if (command.indexOf('sort ') == 0) {
        attribute = command.substring(5);
        command = 'sort';
    }
    if (command.indexOf('date ') == 0) {
        attribute = command.substring(5);
        command = 'date';
    }

    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            showTodo(comments);
            break;
        case 'important':
            showImportant(comments);
            break;
        case 'user':
            showUser(comments, attribute);
            break;
        case 'sort':
            showSorted(comments, attribute);
            break;
        case 'date':
            showDate(comments, attribute);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!

function collectComments() {
    let files = getFiles();
    let names = getFileNames();
    findTodo(files);
    let comments = [];
    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < files[i].length; j++) {
            files[i][j] = makeObject(files[i][j], names[i]);
            comments.push(files[i][j]);
        }
    }
    return comments;
}

function findTodo(files) { // массив файлов
    for (let i = 0; i < files.length; i++) {
        lines = files[i].split(/\/\/[ ]?todo[ :]+/i); // файл разбит на массив строк, начинающихся с коментов todo
        lines.splice(0, 1); // убрали первый, проверять не надо, т.к. сплитит по разделителю
        files[i] = lines; // файлу присваиваем массив комментов
        const linesAmount = files[i].length; // количество коментов в файле
        for (let j = 0; j < linesAmount; j++) {
            const lineEndNum = files[i][j].indexOf('\n'); // конец строки(символ переноса строки)
            if (lineEndNum != -1) {
                files[i][j] = files[i][j].substring(0, lineEndNum); // обрезаем, остался комент без лишних строк
            }
        }
    }
}

function makeObject(line, fileName) {
    let importance = ' ';
    let user = '';
    let date = '';
    let comment = '';
    const file = fileName;

    if (line.indexOf('!') >= 0) {
        const impAmount = line.match(/!/g);
        importance = '!';
        for (let i = 1; i < impAmount.length; i++) {
            importance += '!';
        }
    }

    if (line.indexOf(';') < 0) {
        comment = line.trim();
    } else {
        line = line.split(';');
        user = line[0].trim();
        date = line[1].trim();
        comment = line[2].trim();
    }

    const object = new Todo(importance, user, date, comment, file);
    return object;
}

function Todo(importance, user, date, comment, file) {
    this.importance = importance;
    this.user = user;
    this.date = date;
    this.comment = comment;
    this.file = file;
}

function showImportant(comments) {
    let importantComments = [];
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].importance != ' ') {
            importantComments.push(comments[i]);
        }
    }
    showTodo(importantComments);
}

function showUser(comments, username) {
    let userComments = [];
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].user.search(username) == 0) {
            userComments.push(comments[i]);
        }
    }
    showTodo(userComments);
}

function showSorted(comments, sortAttribute) {

    switch (sortAttribute) {
        case 'importance':
            showTodo(sortImp(comments));
            break;
        case 'user':
            showTodo(sortUser(comments));
            break;
        case 'date':
            showTodo(sortDate(comments));
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function showDate(comments, date) {
    let datedComments = [];
    date = new Date(date).getTime();
    if (isNaN(date)) {
        console.log('wrong command');
        return;
    }
    for (let i = 0; i < comments.length; i++) {
        const comDate = new Date(comments[i].date).getTime();
        if (comDate >= date) {
            datedComments.push(comments[i]);
        }
    }
    showTodo(datedComments);
}