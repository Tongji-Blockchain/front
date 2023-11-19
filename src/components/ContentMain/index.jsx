import React, {Component, lazy} from 'react'
import {withRouter, Switch, Redirect, Route} from 'react-router-dom'
import Query from "../../pages/Query";

const GraphManagement = lazy(() => import('../../pages/GraphManagement/index'))
const CreateGraph = lazy(() => import('../../pages/GraphManagement/CreateGraph/index'))
// const ErrorPage = LoadableComponent(()=>import('../../routes/Other/ErrorPage/index'))
// const SpringText = LoadableComponent(()=>import('../../routes/Other/SpringText/index'))

class ContentMain extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/query' component={Query}/>
                    <Route exact path='/graph' component={GraphManagement}/>
                    <Route exact path='/graph/create' component={CreateGraph}/>


                    {/*<PrivateRoute exact path='/home/other/animation' component={AnimationDemo}/>*/}
                    {/*<PrivateRoute exact path='/home/other/gallery' component={GalleryDemo}/>*/}
                    {/*<PrivateRoute exact path='/home/other/draft' component={DraftDemo}/>*/}
                    {/*<PrivateRoute exact path='/home/other/chart' component={ChartDemo}/>*/}
                    {/*<PrivateRoute exact path='/home/other/loading' component={LoadingDemo}/>*/}
                    {/*<PrivateRoute exact path='/home/other/404' component={ErrorPage}/>*/}
                    {/*<PrivateRoute exact path='/home/other/springText' component={SpringText}/>*/}

                    {/*<PrivateRoute exact path='/home/about' component={About}/>*/}

                    <Redirect exact from='/' to='/login'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain);
