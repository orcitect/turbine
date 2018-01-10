exports.getAll = function (cb) {
    connection.query('select * from nerd', cb);
};