function sortImp(comments) {
    if (comments.length < 2) {
        return comments;
    }

    let left = [];
    let right = [];

    for (let i = 0; i < comments.length; i++) {
        if (comments[i].importance != ' ') {
            left.push(comments[i]);
        } else {
            right.push(comments[i]);
        }
    }

    if (left.length < 2) return left.concat(right);

    return sortLeft(left).concat(right);
}

function sortLeft(arr) {
    if (arr.length < 2) return arr;

    const pivon = arr[0];
    const p = pivon.importance.match(/!/g);

    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
        const el = arr[i].importance;
        const n = el.match(/!/g);
        if (n.length > p.length) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return sortLeft(left).concat(pivon, sortLeft(right));
}

function sortUser(comments) {
    if (comments.length < 2) return comments;

    let left = [];
    let right = [];

    for (let i = 0; i < comments.length; i++) {
        if (comments[i].user != '') left.push(comments[i]);
        else right.push(comments[i]);
    }

    if (left.length < 2) return left.concat(right);

    left.sort(function(a, b) {
        const userA = a.user.toLowerCase();
        const userB = b.user.toLowerCase();
        if (userA > userB) return 1;
        else if (userA < userB) return -1;
        else return 0;
    });
    return left.concat(right);
}

function sortDate(comments) {
    if (comments.length < 2) return comments;

    let left = [];
    let right = [];

    for (let i = 0; i < comments.length; i++) {
        if (comments[i].date != '') left.push(comments[i]);
        else right.push(comments[i]);
    }

    if (left.length < 2) return left.concat(right);

    left.sort(function(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return left.concat(right);
}

module.exports = {
    sortImp,
    sortDate,
    sortUser,
};