export const AuthenticateUserWithPassword = /* GraphQL */ `
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
          firstname
          lastname
          isAdmin
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`

export const GetAuthenticatedItem = /* GraphQL */ `
  query GetAuthenticatedItem {
    authenticatedItem {
      ... on User {
        id
        email
        firstname
        lastname
        isAdmin
      }
    }
  }
`

export const EndSession = /* GraphQL */ `
  mutation EndSession {
    endSession
  }
`

export const ResetPassword = /* GraphQL */ `
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      success
    }
  }
`

export const GetUsers = /* GraphQL */ `
  query GetUsers(
    $where: UserWhereInput!
    $orderBy: [UserOrderByInput!]!
    $take: Int
    $skip: Int!
  ) {
    users(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      email
      firstname
      lastname
      type
      isAdmin
      enabled
      phoneNumber
      createdAt
    }
    usersCount(where: $where)
  }
`

export const GetTickets = /* GraphQL */ `
  query GetTickets(
    $where: TicketWhereInput!
    $orderBy: [TicketOrderByInput!]!
    $take: Int
    $skip: Int!
  ) {
    tickets(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      solved
      object {
        id
        object
      }
      description
      user {
        id
        email
        firstname
        lastname
      }
      createdAt
      updatedAt
    }
    ticketsCount(where: $where)
  }
`

export const GetTicketsCounts = /* GraphQL */ `
  query GetTicketsCounts {
    pending: ticketsCount(where: { solved: { equals: false } })
    solved: ticketsCount(where: { solved: { equals: true } })
  }
`

export const GetTicket = /* GraphQL */ `
  query GetTicket($where: TicketWhereUniqueInput!) {
    ticket(where: $where) {
      id
      solved
      description
      object {
        id
        object
      }
      user {
        id
        email
        firstname
        lastname
        phoneNumber
      }
      createdAt
      updatedAt
    }
  }
`

export const UpdateTicket = /* GraphQL */ `
  mutation UpdateTicket(
    $where: TicketWhereUniqueInput!
    $data: TicketUpdateInput!
  ) {
    updateTicket(where: $where, data: $data) {
      id
      solved
    }
  }
`

export const GetUser = /* GraphQL */ `
  query GetUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      firstname
      lastname
      type
      isAdmin
      enabled
      anonymized
      phoneNumber
      birthdayDatetimeUtc
      affiliationCode
      age
      averageRate
      coursesCount
      stripeCustomerId
      pushNotifications
      createdAt
      updatedAt
    }
  }
`
