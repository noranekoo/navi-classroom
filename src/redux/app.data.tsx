import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getListTopic, getListClass, onLogin, getInfoUser, showSnackbar } from '../redux/actionCreator/actionCreator';
import CommonService from '../service/common.service';
import { Dropdown, SnackbarModel } from '../models/common.model';
import AuthorizedService from '../service/authorized.service';
import MySnackbar from '../shared/components/my-snackbar';

interface IAppDataProp {
    getListTopic: any;
    getListClass: any;
    onLogin: any;
    logged?: boolean;
    getInfoUser?: any;
    snackbar: SnackbarModel;
    showSnackbar: any;
}

class AppData extends Component<IAppDataProp>{

    commonService = new CommonService();
    authenService = new AuthorizedService();

    componentDidMount = () => {
        this.getData();
        this.getDataClass();
        this.onCheckLogin();
        this.getInformation();
    }

    componentWillReceiveProps(props: IAppDataProp) {
        if (props.logged) {
            this.getDataClass();
        }
    }
    // lấy api danh_mục 
    getData = () => {
        this.commonService.getTopic().subscribe((res: Dropdown[]) => {
            if (res && res.length) {
                this.props.getListTopic(res);
            }
        })
    }

    getDataClass = () => {
        const idUser = this.authenService.getIdUsers()
        idUser && this.commonService.getDropdownClass(idUser).subscribe((res: any[]) => {
            if (res && res.length) {
                res = res.map(item => ({ ...item, id: item._id }))
                this.props.getListClass(res);
            }
        })
    }

    getInformation = () => {
        const idUser = this.authenService.getIdUsers()
        idUser && this.commonService.getInfo(idUser).subscribe((res: any) => {
            if (res) {
                const fullName = `${res.ho} ${res.ten}`;
                res.fullName = fullName;
                this.props.getInfoUser(res);
            }
        })
    }

    onCheckLogin = () => {
        const token = this.authenService.getToken() ? this.authenService.getToken() : null;
        console.log(token);
        const isLogged = token ? true : false;
        const expired = token ? this.authenService.checkExpiryToken(token) : true;
        this.props.onLogin(isLogged && !expired);
    }

    onCloseSnackbar = () => {
        this.props.showSnackbar(new SnackbarModel());
    }

    render() {
        const { snackbar } = this.props;
        return (
            <div>
                {snackbar.open ? <MySnackbar
                    message={snackbar.message}
                    variant={snackbar.variant}
                    open={snackbar.open}
                    onClose={this.onCloseSnackbar}
                /> : null}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        snackbar: state.data.snackbar,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    const actionsCreator = { getListTopic, getListClass, onLogin, getInfoUser, showSnackbar };
    const action = bindActionCreators(actionsCreator, dispatch);
    return { ...action };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppData);