import React, {Fragment} from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Error from "./layout/Error";
import Console from "./Console";
import Equipment from "./modules/items/Equipment";
import Stash from "./modules/items/Stash";
import Stats from "./modules/stats/Stats";
import Location from "./modules/instance/Location";
import {Routes, Navigate} from "react-router";
import {Route, Link} from "react-router-dom";
import SignupPage from '../pages/auth/Signup';
import LoginPage from '../pages/auth/Login';
import Button from "./Button/Button";
import {Windows} from "../js/core/turmoil-windows";

export default class Turmoil extends React.Component
{
	state = {
		isAuth: false,
		token: null,
		userId: null,
		authLoading: false,
		error: null,
		shouldRedirect: false
	};

	componentDidMount() {
		console.log('mounted at', this.props.location);

		if (this.props.location.pathname === '/logged') {
			console.log('is in logged pathname');
			setTimeout(
				() => {
					Windows.initWindow('console', true);
					console.log('tried to init window...');
				}, 2000);
		}
		else {
			console.log('is not in pathname :/');
		}
	}

	// componentDidMount() {
	// 	const token = localStorage.getItem('token');
	// 	const expiryDate = localStorage.getItem('expiryDate');
	// 	if (!token || !expiryDate) {
	// 		return;
	// 	}
	// 	if (new Date(expiryDate) <= new Date()) {
	// 		this.logoutHandler();
	// 		return;
	// 	}
	// 	const userId = localStorage.getItem('userId');
	// 	const remainingMilliseconds =
	// 		new Date(expiryDate).getTime() - new Date().getTime();
	// 	this.setState({ isAuth: true, token: token, userId: userId });
	// 	this.setAutoLogout(remainingMilliseconds);
	// }

	changeShouldRedirect = (e, state) => {
		console.log('clicked!', e, state);
		console.log('state', this.state);
		this.setState({shouldRedirect: !state.shouldRedirect});
		console.log('state', this.state);
	};

	setAutoLogout = milliseconds => {
		setTimeout(() => {
			this.logoutHandler();
		}, milliseconds);
	};

	logoutHandler = () => {
		this.setState({ isAuth: false, token: null });
		localStorage.removeItem('token');
		localStorage.removeItem('expiryDate');
		localStorage.removeItem('userId');
	};

	loginHandler = (event, authData) => {
		event.preventDefault();

		this.setState({ authLoading: true });
		fetch('http://localhost:3030/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: authData.email,
				password: authData.password
			})

			// if we were doing authorization:
			// Authorization: 'Bearer ' + localStorage.getItem('token')

		})
			.then(res => {
				if (res.status === 422) {
					throw new Error('Validation failed.');
				}
				if (res.status !== 200 && res.status !== 201) {
					console.log('Error!');
					throw new Error('Could not authenticate you!');
				}
				return res.json();
			})
			.then(resData => {
				console.log(resData);
				this.setState({
					isAuth: true,
					token: resData.token,
					authLoading: false,
					userId: resData.userId
				});
				localStorage.setItem('token', resData.token);
				localStorage.setItem('userId', resData.userId);
				const remainingMilliseconds = 60 * 60 * 1000;
				const expiryDate = new Date(
					new Date().getTime() + remainingMilliseconds
				);
				localStorage.setItem('expiryDate', expiryDate.toISOString());
				//this.setAutoLogout(remainingMilliseconds);

				this.props.navigate('/logged');
			})
			.catch(err => {
				console.log(err);
				this.setState({
					isAuth: false,
					authLoading: false,
					error: err
				});
			});
	};

	signupHandler = (event, authData) => {
		event.preventDefault();
		this.setState({ authLoading: true });
		fetch('http://localhost:3030/user/create', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: authData.signupForm.email.value,
				password: authData.signupForm.password.value,
				name: authData.signupForm.name.value
			})
		})
			.then(res => {
				if (res.status === 422) {
					throw new Error(
						"Validation failed. Make sure the email address isn't used yet!"
					);
				}
				if (res.status !== 200 && res.status !== 201) {
					console.log('Error!');
					throw new Error('Creating a user failed!');
				}
				return res.json();
			})
			.then(resData => {
				console.log(resData);
				this.setState({ isAuth: false, authLoading: false });
				//todo redirect to login
				//this.props.history.replace('/logged');
				this.props.navigate('/login');
			})
			.catch(err => {
				console.log(err);
				this.setState({
					isAuth: false,
					authLoading: false,
					error: err
				});
			});
	};

	render() {
		// console.log("location", this.props.location);

		let routes = (
			<Routes>
				<Route path="/test" element={<div>test <Navigate to="/login"/></div>}/>
				<Route
					path="/logged"
					element={
						<div>
							<Console />
							<Equipment />
							<Stash />
							<Stats />

							<Location />
						</div>
					}
				/>
				<Route
					path="/signup"
					element={
						<SignupPage
							onSignup={this.signupHandler}
							loading={this.state.authLoading}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<LoginPage
							onLogin={this.loginHandler}
							loading={this.state.authLoading}
						/>
					}
				/>
			</Routes>
		);

		return (
			<Fragment>
			<div>
				<Error />
				<Header />

				<div className="turmoilContainer">
					<div id="turmoilBody" className="turmoilBody">
						<div id="shadows">
							<div className="shadowTop"/>
							<div className="shadowLeft"/>
							<div className="shadowRight"/>
							<div className="shadowBottom"/>
						</div>

						<Link to="/logged">Main</Link> | {" "}
						<Link to="/signup">Signup</Link> | {" "}
						<Link to="/login">Login</Link>

						{routes}

						<form >
							<Button design="raised" type="button" onClick={e => this.changeShouldRedirect(e, this.state)}>
								Test me!
							</Button>
						</form>

					</div>
				</div>

				<Footer />
			</div>
			</Fragment>
		);
	}
}
