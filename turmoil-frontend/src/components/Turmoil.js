import React, {Fragment} from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Error from "./layout/Error";
import Console from "./Console";
import Equipment from "./modules/items/Equipment";
import Stash from "./modules/items/Stash";
import Stats from "./modules/stats/Stats";
import Location from "./modules/instance/Location";
import {Route, Routes, Link} from "react-router-dom";
import SignupPage from '../pages/auth/Signup';

export default class Turmoil extends React.Component
{
	state = {
		isAuth: false,
		token: null,
		userId: null,
		authLoading: false,
		error: null
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
				this.props.history.replace('/logged');
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

		let routes = (
			<Routes>
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

						<Link to="/logged">Main</Link> |{" "}
						<Link to="/signup">Signup</Link>

						{routes}

					</div>
				</div>

				<Footer />
			</div>
			</Fragment>
		);
	}
}