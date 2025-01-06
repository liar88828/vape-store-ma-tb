"use client"
import { useActionState } from "react"
import { signInAction } from "../../(auth)/action"

export function SignIn() {
	const [state, action, isPending] = useActionState(signInAction, undefined)
	console.log(state)
	return (
		<div className="w-96">
			{/* <AuthButton /> */}
			<div className="card  bg-base-200 ">
				<form className="card-body" action={action}>
					<h1 className="card-title">Login</h1>
					{state?.success === false && (
						<p className="text-error ">{state.message}</p>
					)}
					<label className="form-control">
						Email
						<input name="email" type="email" className="input input-bordered" />
					</label>
					<label className="form-control">
						Password
						<input
							name="password"
							type="password"
							className="input input-bordered"
						/>
					</label>
					<div className="card-actions mt-5">
						<button disabled={isPending} className="btn w-full btn-neutral">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
