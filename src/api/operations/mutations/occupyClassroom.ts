import { gql } from "@apollo/client";

export const OCCUPY_CLASSROOM = gql`
    mutation occupyClassroom($input: OccupyClassroomInput!) {
        occupyClassroom(input: $input) {
            classroom {
                id
                occupied {
                    user {
                        id
                        firstName
                        patronymic
                        lastName
                        type
                    }
                    until
                    state
                }
            }
            userErrors {
                message
                code
            }
        }
    }
`;