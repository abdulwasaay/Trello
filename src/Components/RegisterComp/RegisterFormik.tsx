import * as Yup from 'yup';

const SignupSchema: any = Yup.object().shape({
    fullname: Yup.string()
        .min(3, 'Name is too Short')
        .max(50, 'Name is too Long')
        .required('Name is required'),
    email: Yup.string().required('Email is required').test('', function (value) {
        const strongEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value) {
            if (!strongEmailRegex.test(value)) {
                return this.createError({ message: "Please enter a correct email" })
            }
            return true
        }
    }),
    password: Yup.string().required("Password is required").test('', function (value) {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,])[A-Za-z\d@$!%*?&,]{8,}$/;
        if (value) {
            if (!strongPasswordRegex.test(value)) {
                return this.createError({ message: "Password must be strong" })
            }
            return true
        }
    }),
    confPassword: Yup.string().required("password is required").test('', function (value: any) {
        const password: any = this.from
        if (value) {
            if (password[0].value.password !== value) {
                return this.createError({ message: "Password mismatch" })
            }
            return true
        }
    }),
});

export default SignupSchema