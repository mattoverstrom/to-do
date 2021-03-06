const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let todoPool;
    let todos;

    const pool = await poolPromise;

    try {
        todoPool = await pool
            .request()
            .input('UserId', sql.Int, 3)
            .query(
                // eslint-disable-next-line quotes
                `select * from ToDos where UserId = @UserId`,
            );
        todos = todoPool.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    //create function class 4------

    return res.json(todos);
};

module.exports.getAll = getAll;

// const sql = require('mssql');
// const { poolPromise } = require('../data/db');

// getAll = async function(req, res) {
//     // format request

//     let todos;

//     res.setHeader('Content-Type', 'application/json');

//     const pool = await poolPromise;

//     try {
//         todos = await pool
//             .request()
//             .input('Name', sql.VarChar, req.query.Name)
//             .input('UserId', sql.Int, req.user.Id)
//             .query(
//                 // eslint-disable-next-line quotes
//                 `select * from ToDos where UserId = @UserId and Name LIKE '%' + @Name + '%' order by OrderId ASC`,
//             );
//         todos = todos.recordset;
//     } catch (e) {
//         returnError(res, e, 500);
//     }

//     return res.json(todos);
// };

// module.exports.getAll = getAll;

// const create = async function(req, res) {
//     res.setHeader('ContentType', 'application/json');
//     const body = req.body;

//     if (!body.Name) {
//         return returnError(res, 'Please enter a name', 422);
//     }
//     const pool = await poolPromise;
//     let orderId;

//     try {
//         orderId = await pool
//             .request()
//             .input('UserId', sql.Int, req.user.Id)
//             .query(
//                 'select max(OrderId) as OrderId from ToDos where UserId = @UserId',
//             );
//         orderId = orderId.recordset.shift().OrderId;
//     } catch (e) {
//         returnError(res, e, 500);
//     }

//     // initialize if it's the very first todo
//     orderId = orderId || orderId === 0 ? orderId + 1 : 0;
//     try {
//         toDo = await pool
//             .request()
//             .input('Name', sql.VarChar, body.Name)
//             .input('OrderId', sql.Int, orderId)
//             .input('UserId', sql.Int, req.user.Id)
//             .query(
//                 'INSERT INTO ToDos ([Name], [UserId], [OrderId]) OUTPUT inserted.* values (@Name, @UserId, @OrderId)',
//             );
//         toDo = toDo.recordset.shift();
//     } catch (e) {
//         returnError(res, e, 500);
//     }

//     return returnSuccessResponse(res, toDo, 201);
// };

// module.exports.create = create;