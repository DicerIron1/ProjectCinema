import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = () => {
    connect('mongodb://localhost/projectCinema', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}