import {gql} from "@apollo/client";

export const FILL_DB = gql`
    mutation fillDB($num: Int!) {
        fillDB(num: $num)
    }
`;
