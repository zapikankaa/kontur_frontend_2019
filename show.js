function showTodo(comments) {
    let result = ``;
    if (comments.length == 0) {
        result += `  !  |  user  |  date  |  comment  |  fileName  `;
        result += `
${new Array(49).join('-')}`;
        console.log(result);
        return;
    }

    const maxWidth = findMaxWidth(comments);
    const verticalLine = new Array(maxWidth.all()).join('-');
    result += `  !  |  ` + `user`.padEnd(maxWidth.user) +
        `  |  ` + `date`.padEnd(maxWidth.date) + `  |  ` +
        `comment`.padEnd(maxWidth.comment) + `  |  ` +
        `fileName`.padEnd(maxWidth.file) + `  `;
    result += `
${verticalLine}`;

    for (let i = 0; i < comments.length; i++) {
        const c = comments[i];
        let imp = c.importance;
        let user = c.user;
        let date = c.date;
        let comment = c.comment;
        let file = c.file;

        if (c.importance.indexOf('!') >= 0) {
            imp = '!';
        }

        if (user.length > 10) {
            user = user.substring(0, maxWidth.user - 4) + '...';
        }

        if (date.length > 10) {
            date = date.substring(0, maxWidth.date - 4) + '...';
        }

        if (comment.length > 50) {
            comment = comment.substring(0, maxWidth.comment - 4) + '...';
        }

        if (file.length > 15) {
            file = file.substring(0, maxWidth.file - 4) + '...';
        }

        result += `
  ${imp}  |  ${user.padEnd(maxWidth.user)}  |  ${date.padEnd(maxWidth.date)}  |  ${comment.padEnd(maxWidth.comment)}  |  ${file.padEnd(maxWidth.file)}  `
    }

    result += `
${verticalLine}`;

    console.log(result);
}

function findMaxWidth(comments) {
    let maxWidth = {
        user: 4,
        date: 4,
        comment: 6,
        file: 8,
        all: function() { return this.user + this.date + this.comment + this.file + 26 }
    };
    for (let i = 0; i < comments.length; i++) {
        const lenUser = comments[i].user.length;
        const lenDate = comments[i].date.length;
        const lenCom = comments[i].comment.length;
        const lenFile = comments[i].file.length;

        if (lenUser <= 10 && lenUser > maxWidth.user) {
            maxWidth.user = lenUser;
        } else if (lenUser > 10) {
            maxWidth.user = 10;
        }

        if (lenDate <= 10 && lenDate > maxWidth.date) {
            maxWidth.date = lenDate;
        } else if (lenDate > 10) {
            maxWidth.date = 10;
        }

        if (lenCom <= 50 && lenCom > maxWidth.comment) {
            maxWidth.comment = lenCom;
        } else if (lenCom > 50) {
            maxWidth.comment = 50;
        }

        if (lenFile <= 15 && lenFile > maxWidth.file) {
            maxWidth.file = lenFile;
        } else if (lenFile > 15) {
            maxWidth.file = 15;
        }
    }

    return maxWidth;
}

module.exports = {
    showTodo,
};