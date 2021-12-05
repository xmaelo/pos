`
          <div id="print-me">
          <div style={{padding: '10px'}}>
              <h3 style={{textAlign: "center"}}>GROUPE HOTELIER RAPHIA</h3>
              
              <br/>
              Table: `+(order.table&&order.table.trim() !== ""&&tables.filter(t =>t['@id'] === table)[0].name)+ `<br/>
              Date: `+(order.time?.split('T')[0])+`<br/>
              <hr style={{border: "none",
                  borderTop: "3px double #333",
                  color: "#333",
                  overflow: "visible",
                  textAlign: "center",
                  height: "5px"}}
                  />
              <br/>
              <h4>Consommables:</h4>
              <Typography style={{marginTop: "5px"}}>
                  {consommabes&&consommabes.map((c, i) => 
                  <div key={c.id}>
                      <span >{"- "+c.name} </span>
                      <span style={{float: "right"}}>{(object[c.id] ? object[c.id] : '1')+" X "+c.price+ " FCFA"} </span>
                  </div>
                  )}
              </Typography>
              <hr style={{border: "none",
                  borderTop: "3px double #333",
                  color: "#333",
                  overflow: "visible",
                  textAlign: "center",
                  height: "5px"}}
              />
              <br/>
              Total: {props.order.price} FCFA
          </div>
      </div>
          `