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
      drivingLicense {
        id
        state
      }
      insurance {
        id
        state
      }
      registrationDocument {
        id
        state
      }
      certificate {
        id
        state
      }
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

export const GetUsersCounts = /* GraphQL */ `
  query GetUsersCounts(
    $todayWhere: UserWhereInput!
    $weekWhere: UserWhereInput!
    $monthWhere: UserWhereInput!
  ) {
    total: usersCount(where: { isAdmin: { equals: false } })
    today: usersCount(where: $todayWhere)
    week: usersCount(where: $weekWhere)
    month: usersCount(where: $monthWhere)
    passengers: usersCount(
      where: { type: { equals: "passenger" }, isAdmin: { equals: false } }
    )
    drivers: usersCount(
      where: { type: { equals: "driver" }, isAdmin: { equals: false } }
    )
  }
`

export const GetDriversAverageRating = /* GraphQL */ `
  query GetDriversAverageRating {
    users(
      where: { type: { equals: "driver" }, isAdmin: { equals: false } }
      orderBy: []
      skip: 0
    ) {
      id
      averageRate
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
      avatar {
        id
        url
      }
      drivingLicense {
        id
        state
        obtentionYear
        picture {
          id
          url
        }
        createdAt
        updatedAt
      }
      insurance {
        id
        state
        expirationDatetimeUtc
        isExpired
        picture {
          id
          url
        }
        createdAt
        updatedAt
      }
      registrationDocument {
        id
        state
        picture {
          id
          url
        }
        createdAt
        updatedAt
      }
      certificate {
        id
        state
        expirationDatetime
        registrationDatetime
        picture {
          id
          url
        }
        createdAt
        updatedAt
      }
      vehicule {
        id
        brand
        model
        color
        registration
        country
        firstYear
      }
      ratings(orderBy: [{ createdAt: desc }], take: 10) {
        id
        note
        message
        tags
        user {
          id
          firstname
          lastname
        }
        createdAt
      }
      ratingsCount
    }
  }
`

export const UpdateUser = /* GraphQL */ `
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
      enabled
    }
  }
`

export const UpdateDrivingLicense = /* GraphQL */ `
  mutation UpdateDrivingLicense(
    $where: DrivingLicenseWhereUniqueInput!
    $data: DrivingLicenseUpdateInput!
  ) {
    updateDrivingLicense(where: $where, data: $data) {
      id
      state
    }
  }
`

export const UpdateInsurance = /* GraphQL */ `
  mutation UpdateInsurance(
    $where: InsuranceWhereUniqueInput!
    $data: InsuranceUpdateInput!
  ) {
    updateInsurance(where: $where, data: $data) {
      id
      state
    }
  }
`

export const UpdateRegistrationDocument = /* GraphQL */ `
  mutation UpdateRegistrationDocument(
    $where: RegistrationDocumentWhereUniqueInput!
    $data: RegistrationDocumentUpdateInput!
  ) {
    updateRegistrationDocument(where: $where, data: $data) {
      id
      state
    }
  }
`

export const UpdateCertificate = /* GraphQL */ `
  mutation UpdateCertificate(
    $where: CertificateWhereUniqueInput!
    $data: CertificateUpdateInput!
  ) {
    updateCertificate(where: $where, data: $data) {
      id
      state
    }
  }
`
