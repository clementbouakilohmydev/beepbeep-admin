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
      averageRate
      ratingsCount
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
      messages(orderBy: [{ createdAt: asc }]) {
        id
        content
        createdAt
        author {
          id
          firstname
          lastname
          email
          isAdmin
        }
        attachment {
          id
          uri
          mimetype
        }
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

export const CreateTicketMessage = /* GraphQL */ `
  mutation CreateTicketMessage($data: TicketMessageCreateInput!) {
    createTicketMessage(data: $data) {
      id
      content
      createdAt
      author {
        id
        firstname
        lastname
        email
        isAdmin
      }
      attachment {
        id
        uri
        mimetype
      }
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
    active: usersCount(
      where: { enabled: { equals: true }, isAdmin: { equals: false } }
    )
    blocked: usersCount(
      where: { enabled: { equals: false }, isAdmin: { equals: false } }
    )
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
        uri
      }
      drivingLicense {
        id
        state
        obtentionYear
        picture {
          id
          uri
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
          uri
        }
        createdAt
        updatedAt
      }
      registrationDocument {
        id
        state
        picture {
          id
          uri
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
          uri
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

// États Course alignés sur back/api/src/models/Course.ts: ["accepted", "rejected", "cancelled", "paid"]
export const GetCoursesCounts = /* GraphQL */ `
  query GetCoursesCounts {
    inProgress: coursesCount(where: { state: { equals: "accepted" } })
    rejected: coursesCount(where: { state: { equals: "rejected" } })
    completed: coursesCount(where: { state: { equals: "paid" } })
    cancelled: coursesCount(where: { state: { equals: "cancelled" } })
  }
`

export const GetCoursesCountsByPeriod = /* GraphQL */ `
  query GetCoursesCountsByPeriod(
    $todayWhere: CourseWhereInput!
    $weekWhere: CourseWhereInput!
    $monthWhere: CourseWhereInput!
    $yearWhere: CourseWhereInput!
  ) {
    total: coursesCount
    today: coursesCount(where: $todayWhere)
    week: coursesCount(where: $weekWhere)
    month: coursesCount(where: $monthWhere)
    year: coursesCount(where: $yearWhere)
  }
`

// Note : les anciennes queries GetCoursesForStats / GetRecentCourses /
// GetRecentUsers / GetDriversAverageRating (fetch 500-1000 rows + calcul
// client) ont été remplacées par les agrégats serveur de adminStats
// (cf back/api/src/extensions/adminStats.ts) — Get*AdminStats*Query plus bas.

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

// ─── Admin stats (agrégations back) ───────────────────────────────────
// Remplace les fetchs client-side de 500-1000 items (cf BACK_TODO.md).
// Cf back/api/src/extensions/adminStats.ts pour le détail des résolveurs.

export const GetAdminRevenueStats = /* GraphQL */ `
  query GetAdminRevenueStats($from: DateTime, $to: DateTime) {
    adminRevenueStats(from: $from, to: $to) {
      revenue
      fees
      basket
      count
    }
  }
`

export const GetAdminCoursesMetrics = /* GraphQL */ `
  query GetAdminCoursesMetrics($from: DateTime, $to: DateTime) {
    adminCoursesMetrics(from: $from, to: $to) {
      averageDistance
      averageDuration
      averagePrice
      averageAcceptanceTimeSeconds
      count
    }
  }
`

export const GetAdminCoursesTrend = /* GraphQL */ `
  query GetAdminCoursesTrend($days: Int!) {
    adminCoursesTrend(days: $days) {
      date
      count
    }
  }
`

export const GetAdminUsersTrend = /* GraphQL */ `
  query GetAdminUsersTrend($days: Int!) {
    adminUsersTrend(days: $days) {
      date
      count
    }
  }
`

export const GetAdminTicketsTrend = /* GraphQL */ `
  query GetAdminTicketsTrend($days: Int!) {
    adminTicketsTrend(days: $days) {
      date
      count
    }
  }
`

export const GetAdminDriversAverageRating = /* GraphQL */ `
  query GetAdminDriversAverageRating {
    adminDriversAverageRating
  }
`

export const GetAdminPendingDocumentsCount = /* GraphQL */ `
  query GetAdminPendingDocumentsCount {
    adminPendingDocumentsCount
  }
`

export const GetAdminDocuments = /* GraphQL */ `
  query GetAdminDocuments(
    $type: AdminDocumentType
    $state: AdminDocumentState
    $take: Int!
    $skip: Int!
  ) {
    adminDocuments(type: $type, state: $state, take: $take, skip: $skip) {
      total
      items {
        id
        type
        state
        createdAt
        updatedAt
        user {
          id
          firstname
          lastname
          email
        }
        picture {
          id
          uri
        }
        previousPicture {
          id
          uri
        }
      }
    }
  }
`

export const GetAdminDailyAggregates = /* GraphQL */ `
  query GetAdminDailyAggregates($days: Int!) {
    adminDailyAggregates(days: $days) {
      date
      count
      revenue
      fees
      averagePrice
      averageDistance
    }
  }
`
