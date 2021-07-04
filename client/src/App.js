import React from 'react';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import './App.scss';

function App() {
  const [staff, setStaff] = React.useState([]);
  const [error, hasError] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      axios.get('api/get_vailable')
      .then(function (response) {
        // handle success
        setStaff(response.data)
      })
      .catch(function (e) {
        // handle error
        hasError(true);
      })
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="columns is-desktop is-gapless">
        <div className="column is-3-desktop has-text-centered sideNav">
          {/* title  */}
          <div className="columns pt-4 mx-4">
            <div className="column is-full">
              <h3 className="title is-3 pt-5">Dev Daily Dashboard</h3>
            </div>
          </div>
          {/* available resources */}
          <div className="columns mt-4 mx-4">
            <div className="column is-full">
              <div className="card">
                <header className="card-header available-resource-header">
                  <p className="card-header-title title is-5 has-text-white">
                    <span className="icon mr-3">
                      <i className="fas fa-users"></i>
                      </span>
                      Available Resource
                  </p>
                </header>
                <div className="card-content available-resource-content p-2">
                  <div className="content">
                      <table className="table">
                        <tbody>
                          {
                            (error)?
                            <tr>
                              <td>ERROORR!</td>
                            </tr>
                            : (
                            staff.map(user=>{
                              return(
                                <tr key={user.staffid}>
                                  <td>
                                    <div className="columns is-flex">
                                      <div className="column is-3-desktop is-flex is-justify-content-center is-3-mobile">
                                        <figure className="image is-48x48 mx-0">
                                          <img className="is-rounded height-100" src={
                                            (user.profile_image != null)?
                                              `https://ad-weave.io/crm/uploads/staff_profile_images/${user.staffid}/thumb_${user.profile_image}`:
                                              "https://uploads-ssl.webflow.com/5fef96e9ea5148eb6ea7bcb5/601b20ce9406eb554fae78a7_Logo-mark.svg"
                                            } alt={`dev-${user.staffid}`}/>
                                        </figure>
                                      </div>

                                      <div className="column is-flex is-flex-direction-column is-justify-content-center">
                                        <div className="columns is-gapless m-0">
                                            <div className="column">
                                              <p className="has-text-weight-bold staff-name title is-5">
                                                {`${user.firstname} ${user.lastname}`}
                                              </p>
                                            </div>
                                        </div>

                                        <div className="columns is-gapless m-0">
                                            <div className="column">
                                              <p className="subtitle is-6">
                                                {
                                                  (user.team.toLowerCase().includes("video"))?
                                                  <span className="has-text-grey-light">Video Developer</span> :
                                                  <span className="has-text-grey-light">H5 Developer</span>
                                                }
                                              </p>
                                            </div>
                                        </div>
                                      </div>
                                    </div>      
                                  </td>
                                  <td>
                                    <div>                                    
                                      <i className="fas fa-sun has-text-warning"></i>
                                      <i className="fas fa-moon has-text-grey-dark"></i>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                            )
                          }
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* status count */}
          <div className="columns mt-4 mx-4">
            <div className="column">
              <div className="card has-background-transparent">
                <header className="card-header mb-2">
                  <p className="card-header-title title is-5 has-text-grey-light p-2">
                    Active Queue
                  </p>
                </header>
                <div className="card-content p-2">
                  <div className="content">
                    <div className="columns is-gapless m-0 has-text-left-desktop has-text-white is-size-6">
                      <div className="column">
                        <div className="columns m-0">
                          <div className="column m-0 p-0">Creative Build</div>
                        </div>
                        <div className="columns m-0">
                          <div className="column m-0 p-0"><p className="title is-1 task-count">0</p></div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="columns m-0">
                          <div className="column m-0 p-0">Studio Setup</div>
                        </div>
                        <div className="columns m-0">
                          <div className="column m-0 p-0"><p className="title is-1 task-count">0</p></div>
                        </div>
                      </div>
                    </div>
                    <div className="columns is-gapless m-0 has-text-left-desktop has-text-white is-size-6">
                      <div className="column">
                        <div className="columns m-0">
                          <div className="column m-0 p-0">Asset Review</div>
                        </div>
                        <div className="columns m-0">
                          <div className="column m-0 p-0"><p className="title is-1 task-count">0</p></div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="columns m-0">
                          <div className="column m-0 p-0">Assembly/Audience</div>
                        </div>
                        <div className="columns m-0">
                          <div className="column m-0 p-0"><p className="title is-1 task-count">0</p></div>
                        </div>
                      </div>
                    </div>
                    <div className="columns is-gapless m-0 has-text-left-desktop has-text-white is-size-6">
                      <div className="column">
                        <div className="columns m-0">
                          <div className="column m-0 p-0">Client Revision</div>
                        </div>
                        <div className="columns m-0">
                          <div className="column m-0 p-0"><p className="title is-1 task-count">0</p></div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="columns m-0">
                          <div className="column m-0 p-0">Others</div>
                        </div>
                        <div className="columns m-0">
                          <div className="column m-0 p-0"><p className="title is-1 task-count">0</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          2<br></br>
          tbltask_assignedad
          ad
        </div>
      </div>
    </div>
  );
}

export default App;
