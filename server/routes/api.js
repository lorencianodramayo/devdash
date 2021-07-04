const express = require("express");
const axios = require("axios");
const { response } = require("express");
const router = express.Router();

const mysql = require('mysql');
const db_config = require("../connection/aw_connection");
const pool = mysql.createPool(db_config);

router.get("/get_vailable", (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(`select 
                            tblstaff.staffid, 
                            tblstaff.email, 
                            tblstaff.firstname, 
                            tblstaff.lastname, 
                            tblstaff.profile_image, 
                            tblroles.name as rolename, 
                            tblteams.name as team 
                        from ((tblstaff
                            INNER JOIN tblroles ON tblstaff.role = tblroles.roleid)
                            INNER JOIN tblteams ON tblstaff.teamid = tblteams.teamid) 
                            WHERE tblstaff.staffid NOT IN 
                                    (SELECT DISTINCT tblstaff.staffid From ((
                                        (tbltasks inner JOIN tbltask_assigned ON tbltasks.id = tbltask_assigned.taskid)
                                            INNER JOIN tblstaff ON tbltask_assigned.staffid = tblstaff.staffid) 
                                            INNER JOIN tblteams ON tblstaff.teamid = tblteams.teamid) 
                                    where tblteams.name LIKE concat('%', 'production', '%')
                                            AND tbltasks.status = 4 
                                            AND tbltasks.name NOT LIKE '%Calls, Meetings, and Trainings%' 
                                            AND tbltasks.name NOT LIKE '%Ad-hoc tasks%')
                                            AND tblteams.name LIKE concat('%', 'production', '%')
                                            And tblstaff.lastname NOT IN ('Dramayo', 'alcantara', 'Ordinario')`,  
        (err, rows) => {
            connection.release();
            if (err) throw err;

            res.send(JSON.stringify(rows));
        });
    })
});

module.exports = router;