"use client"
import React, { useActionState } from "react"
import { MessageErrorForm } from "@/app/components/element/MessageErrorForm";
import { signUpAction } from "@/server/action/auth.action";

export function SignUp() {
	const [state, action, isPending] = useActionState(signUpAction, undefined)
	return (
		<div className="w-96">
			<div className="card  bg-base-200 ">
				<form className="card-body" action={action}>
					<h1 className="card-title">Register</h1>
					{state?.success === false && (
						<p className="text-error ">{state.message}</p>
					)}
					<label className="form-control">
						Email
                        <input name="email" type="email"
                               defaultValue={ state?.prev.email ?? '' }

                               className="input input-bordered"/>
                        <MessageErrorForm errors={ state?.error?.email }/>

					</label>
					<label className="form-control">
						Password
						<input
							name="password"
							type="password"
							className="input input-bordered"
						/>
                        <MessageErrorForm errors={ state?.error?.email }/>

					</label>
					<div className="card-actions mt-5">
						<button disabled={isPending} className="btn w-full btn-neutral">
                            Register
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
