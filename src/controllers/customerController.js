const controller = {};

controller.list = (req, res)=> {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer',(err, customers) => {
        if(err){
            res.json(err);
        }
        res.render('customers', {
            data: customers
        });
        });
    });
};

controller.save = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO customer set ?',[data],(err, customer) =>{
            res.redirect('/investigador');
        })
    });
};


controller.edit = (req,res) => {//EDIT
    const {id} = req.params;
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?',[id], (err, customer) => {
            res.render('customers_edit', {
                data:customer[0]
            });
        });
    });
};

controller.update = (req,res) => {//UPDATE
    const {id} = req.params;
    const newCustomer = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?',[newCustomer, id], (err, customer) => {
            res.redirect('/investigador');
        });
    });
};


controller.delete = (req,res) => {
  const {id} = req.params;
   req.getConnection((err,conn) => {
    conn.query('DELETE FROM customer WHERE id = ?',[id],(err, rows) => {
        res.redirect('/investigador')
    })
   })
};



module.exports =  controller;