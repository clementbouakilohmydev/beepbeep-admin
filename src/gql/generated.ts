/* eslint-disable */
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

export type AddPushTokenType = {
  __typename?: 'AddPushTokenType';
  success: Scalars['Boolean']['output'];
};

export type Address = {
  __typename?: 'Address';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['JSON']['output']>;
  locationCity?: Maybe<Scalars['String']['output']>;
  locationCountry?: Maybe<Scalars['String']['output']>;
  locationName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type AddressCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
  locationCity?: InputMaybe<Scalars['String']['input']>;
  locationCountry?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type AddressManyRelationFilter = {
  every?: InputMaybe<AddressWhereInput>;
  none?: InputMaybe<AddressWhereInput>;
  some?: InputMaybe<AddressWhereInput>;
};

export type AddressOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  locationCity?: InputMaybe<OrderDirection>;
  locationCountry?: InputMaybe<OrderDirection>;
  locationName?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type AddressRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<AddressWhereUniqueInput>>;
  create?: InputMaybe<Array<AddressCreateInput>>;
};

export type AddressRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<AddressWhereUniqueInput>>;
  create?: InputMaybe<Array<AddressCreateInput>>;
  disconnect?: InputMaybe<Array<AddressWhereUniqueInput>>;
  set?: InputMaybe<Array<AddressWhereUniqueInput>>;
};

export type AddressUpdateArgs = {
  data: AddressUpdateInput;
  where: AddressWhereUniqueInput;
};

export type AddressUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
  locationCity?: InputMaybe<Scalars['String']['input']>;
  locationCountry?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  locationCity?: InputMaybe<StringFilter>;
  locationCountry?: InputMaybe<StringFilter>;
  locationName?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AdminCoursesMetrics = {
  __typename?: 'AdminCoursesMetrics';
  averageAcceptanceTimeSeconds?: Maybe<Scalars['Float']['output']>;
  averageDistance?: Maybe<Scalars['Float']['output']>;
  averageDuration?: Maybe<Scalars['Float']['output']>;
  averagePrice?: Maybe<Scalars['Float']['output']>;
  count: Scalars['Int']['output'];
};

export type AdminDailyAggregate = {
  __typename?: 'AdminDailyAggregate';
  averageDistance?: Maybe<Scalars['Float']['output']>;
  averagePrice?: Maybe<Scalars['Float']['output']>;
  count: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  fees: Scalars['Float']['output'];
  revenue: Scalars['Float']['output'];
};

export type AdminDocument = {
  __typename?: 'AdminDocument';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  picture?: Maybe<AdminDocumentPicture>;
  state?: Maybe<Scalars['String']['output']>;
  type: AdminDocumentType;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<AdminDocumentUser>;
};

export type AdminDocumentPicture = {
  __typename?: 'AdminDocumentPicture';
  id: Scalars['ID']['output'];
  uri?: Maybe<Scalars['String']['output']>;
};

export type AdminDocumentState =
  | 'pending'
  | 'processing'
  | 'rejected'
  | 'verified';

export type AdminDocumentType =
  | 'certificate'
  | 'drivingLicense'
  | 'insurance'
  | 'registrationDocument';

export type AdminDocumentUser = {
  __typename?: 'AdminDocumentUser';
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
};

export type AdminDocumentsPage = {
  __typename?: 'AdminDocumentsPage';
  items: Array<AdminDocument>;
  total: Scalars['Int']['output'];
};

export type AdminLog = {
  __typename?: 'AdminLog';
  action?: Maybe<Scalars['String']['output']>;
  admin?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  targetId?: Maybe<Scalars['String']['output']>;
  targetType?: Maybe<Scalars['String']['output']>;
};

export type AdminLogCreateInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  admin?: InputMaybe<UserRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  targetType?: InputMaybe<Scalars['String']['input']>;
};

export type AdminLogOrderByInput = {
  action?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  targetId?: InputMaybe<OrderDirection>;
  targetType?: InputMaybe<OrderDirection>;
};

export type AdminLogUpdateArgs = {
  data: AdminLogUpdateInput;
  where: AdminLogWhereUniqueInput;
};

export type AdminLogUpdateInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  admin?: InputMaybe<UserRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  targetId?: InputMaybe<Scalars['String']['input']>;
  targetType?: InputMaybe<Scalars['String']['input']>;
};

export type AdminLogWhereInput = {
  AND?: InputMaybe<Array<AdminLogWhereInput>>;
  NOT?: InputMaybe<Array<AdminLogWhereInput>>;
  OR?: InputMaybe<Array<AdminLogWhereInput>>;
  action?: InputMaybe<StringFilter>;
  admin?: InputMaybe<UserWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  targetId?: InputMaybe<StringFilter>;
  targetType?: InputMaybe<StringFilter>;
};

export type AdminLogWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AdminRevenueStats = {
  __typename?: 'AdminRevenueStats';
  basket: Scalars['Float']['output'];
  count: Scalars['Int']['output'];
  fees: Scalars['Float']['output'];
  revenue: Scalars['Float']['output'];
};

export type AdminTrendPoint = {
  __typename?: 'AdminTrendPoint';
  count: Scalars['Int']['output'];
  date: Scalars['String']['output'];
};

export type Affiliation = {
  __typename?: 'Affiliation';
  code?: Maybe<Scalars['String']['output']>;
  consumed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  user?: Maybe<User>;
  withUser?: Maybe<User>;
};

export type AffiliationCreateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  consumed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
  withUser?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type AffiliationManyRelationFilter = {
  every?: InputMaybe<AffiliationWhereInput>;
  none?: InputMaybe<AffiliationWhereInput>;
  some?: InputMaybe<AffiliationWhereInput>;
};

export type AffiliationOrderByInput = {
  code?: InputMaybe<OrderDirection>;
  consumed?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type AffiliationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<AffiliationWhereUniqueInput>>;
  create?: InputMaybe<Array<AffiliationCreateInput>>;
};

export type AffiliationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<AffiliationWhereUniqueInput>>;
  create?: InputMaybe<Array<AffiliationCreateInput>>;
  disconnect?: InputMaybe<Array<AffiliationWhereUniqueInput>>;
  set?: InputMaybe<Array<AffiliationWhereUniqueInput>>;
};

export type AffiliationRelateToOneForCreateInput = {
  connect?: InputMaybe<AffiliationWhereUniqueInput>;
  create?: InputMaybe<AffiliationCreateInput>;
};

export type AffiliationRelateToOneForUpdateInput = {
  connect?: InputMaybe<AffiliationWhereUniqueInput>;
  create?: InputMaybe<AffiliationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AffiliationUpdateArgs = {
  data: AffiliationUpdateInput;
  where: AffiliationWhereUniqueInput;
};

export type AffiliationUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  consumed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
  withUser?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type AffiliationWhereInput = {
  AND?: InputMaybe<Array<AffiliationWhereInput>>;
  NOT?: InputMaybe<Array<AffiliationWhereInput>>;
  OR?: InputMaybe<Array<AffiliationWhereInput>>;
  code?: InputMaybe<StringFilter>;
  consumed?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  user?: InputMaybe<UserWhereInput>;
  withUser?: InputMaybe<UserWhereInput>;
};

export type AffiliationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Certificate = {
  __typename?: 'Certificate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDatetime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  picture?: Maybe<File>;
  registrationDatetime?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type CertificateCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetime?: InputMaybe<Scalars['DateTime']['input']>;
  picture?: InputMaybe<FileRelateToOneForCreateInput>;
  registrationDatetime?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CertificateOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  expirationDatetime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  registrationDatetime?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CertificateRelateToOneForCreateInput = {
  connect?: InputMaybe<CertificateWhereUniqueInput>;
  create?: InputMaybe<CertificateCreateInput>;
};

export type CertificateRelateToOneForUpdateInput = {
  connect?: InputMaybe<CertificateWhereUniqueInput>;
  create?: InputMaybe<CertificateCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CertificateUpdateArgs = {
  data: CertificateUpdateInput;
  where: CertificateWhereUniqueInput;
};

export type CertificateUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetime?: InputMaybe<Scalars['DateTime']['input']>;
  picture?: InputMaybe<FileRelateToOneForUpdateInput>;
  registrationDatetime?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CertificateWhereInput = {
  AND?: InputMaybe<Array<CertificateWhereInput>>;
  NOT?: InputMaybe<Array<CertificateWhereInput>>;
  OR?: InputMaybe<Array<CertificateWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  expirationDatetime?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  picture?: InputMaybe<FileWhereInput>;
  registrationDatetime?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CertificateWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type ClearPushTokensType = {
  __typename?: 'ClearPushTokensType';
  success: Scalars['Boolean']['output'];
};

export type Course = {
  __typename?: 'Course';
  cancellationFee?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  distance?: Maybe<Scalars['Int']['output']>;
  driver?: Maybe<User>;
  duration?: Maybe<Scalars['Int']['output']>;
  endDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  fees?: Maybe<Scalars['Float']['output']>;
  fromNode?: Maybe<Node>;
  hasBeenReminded?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<Message>>;
  messagesCount?: Maybe<Scalars['Int']['output']>;
  passenger?: Maybe<User>;
  payment?: Maybe<Payment>;
  price?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Array<Rating>>;
  ratingsCount?: Maybe<Scalars['Int']['output']>;
  startDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  terminatedByDriver?: Maybe<Scalars['Boolean']['output']>;
  toNode?: Maybe<Node>;
  trip?: Maybe<Trip>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};


export type CourseMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  orderBy?: Array<MessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MessageWhereInput;
};


export type CourseMessagesCountArgs = {
  where?: MessageWhereInput;
};


export type CourseRatingsArgs = {
  cursor?: InputMaybe<RatingWhereUniqueInput>;
  orderBy?: Array<RatingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RatingWhereInput;
};


export type CourseRatingsCountArgs = {
  where?: RatingWhereInput;
};

export type CourseCreateInput = {
  cancellationFee?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  driver?: InputMaybe<UserRelateToOneForCreateInput>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  endDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  fromNode?: InputMaybe<NodeRelateToOneForCreateInput>;
  hasBeenReminded?: InputMaybe<Scalars['Boolean']['input']>;
  messages?: InputMaybe<MessageRelateToManyForCreateInput>;
  passenger?: InputMaybe<UserRelateToOneForCreateInput>;
  payment?: InputMaybe<PaymentRelateToOneForCreateInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  ratings?: InputMaybe<RatingRelateToManyForCreateInput>;
  startDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  terminatedByDriver?: InputMaybe<Scalars['Boolean']['input']>;
  toNode?: InputMaybe<NodeRelateToOneForCreateInput>;
  trip?: InputMaybe<TripRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type CourseManyRelationFilter = {
  every?: InputMaybe<CourseWhereInput>;
  none?: InputMaybe<CourseWhereInput>;
  some?: InputMaybe<CourseWhereInput>;
};

export type CourseOrderByInput = {
  cancellationFee?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  distance?: InputMaybe<OrderDirection>;
  duration?: InputMaybe<OrderDirection>;
  endDatetimeUtc?: InputMaybe<OrderDirection>;
  fees?: InputMaybe<OrderDirection>;
  hasBeenReminded?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  startDatetimeUtc?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  terminatedByDriver?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type CourseRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
};

export type CourseRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  create?: InputMaybe<Array<CourseCreateInput>>;
  disconnect?: InputMaybe<Array<CourseWhereUniqueInput>>;
  set?: InputMaybe<Array<CourseWhereUniqueInput>>;
};

export type CourseRelateToOneForCreateInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  create?: InputMaybe<CourseCreateInput>;
};

export type CourseRelateToOneForUpdateInput = {
  connect?: InputMaybe<CourseWhereUniqueInput>;
  create?: InputMaybe<CourseCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CourseUpdateArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};

export type CourseUpdateInput = {
  cancellationFee?: InputMaybe<Scalars['Float']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  driver?: InputMaybe<UserRelateToOneForUpdateInput>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  endDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  fromNode?: InputMaybe<NodeRelateToOneForUpdateInput>;
  hasBeenReminded?: InputMaybe<Scalars['Boolean']['input']>;
  messages?: InputMaybe<MessageRelateToManyForUpdateInput>;
  passenger?: InputMaybe<UserRelateToOneForUpdateInput>;
  payment?: InputMaybe<PaymentRelateToOneForUpdateInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  ratings?: InputMaybe<RatingRelateToManyForUpdateInput>;
  startDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  terminatedByDriver?: InputMaybe<Scalars['Boolean']['input']>;
  toNode?: InputMaybe<NodeRelateToOneForUpdateInput>;
  trip?: InputMaybe<TripRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type CourseWhereInput = {
  AND?: InputMaybe<Array<CourseWhereInput>>;
  NOT?: InputMaybe<Array<CourseWhereInput>>;
  OR?: InputMaybe<Array<CourseWhereInput>>;
  cancellationFee?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  distance?: InputMaybe<IntNullableFilter>;
  driver?: InputMaybe<UserWhereInput>;
  duration?: InputMaybe<IntNullableFilter>;
  endDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  fees?: InputMaybe<FloatNullableFilter>;
  fromNode?: InputMaybe<NodeWhereInput>;
  hasBeenReminded?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  messages?: InputMaybe<MessageManyRelationFilter>;
  passenger?: InputMaybe<UserWhereInput>;
  payment?: InputMaybe<PaymentWhereInput>;
  price?: InputMaybe<FloatNullableFilter>;
  ratings?: InputMaybe<RatingManyRelationFilter>;
  startDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<StringFilter>;
  terminatedByDriver?: InputMaybe<BooleanFilter>;
  toNode?: InputMaybe<NodeWhereInput>;
  trip?: InputMaybe<TripWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CourseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  payment?: InputMaybe<PaymentWhereUniqueInput>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

/**
 * Résultat de deleteMyAccount.
 * - success=true : compte marqué comme supprimé (deletedAt set côté DB).
 * - success=false : un blocage métier empêche la suppression maintenant ;
 *   `reasonCode` indique au client quel cas afficher.
 */
export type DeleteMyAccountResult = {
  __typename?: 'DeleteMyAccountResult';
  reasonCode?: Maybe<Scalars['String']['output']>;
  reasonMessage?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Driver = {
  __typename?: 'Driver';
  availability?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['JSON']['output']>;
  locationCity?: Maybe<Scalars['String']['output']>;
  locationCountry?: Maybe<Scalars['String']['output']>;
  locationName?: Maybe<Scalars['String']['output']>;
  radius?: Maybe<Scalars['Int']['output']>;
  slots?: Maybe<Array<DriverSlot>>;
  slotsCount?: Maybe<Scalars['Int']['output']>;
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  tripsArround?: Maybe<Array<Maybe<DriverTripArroundType>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};


export type DriverSlotsArgs = {
  cursor?: InputMaybe<DriverSlotWhereUniqueInput>;
  orderBy?: Array<DriverSlotOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DriverSlotWhereInput;
};


export type DriverSlotsCountArgs = {
  where?: DriverSlotWhereInput;
};


export type DriverTripsArroundArgs = {
  fromDatetimeUtc?: InputMaybe<Scalars['String']['input']>;
  toDatetimeUtc?: InputMaybe<Scalars['String']['input']>;
};

export type DriverCreateInput = {
  availability?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
  locationCity?: InputMaybe<Scalars['String']['input']>;
  locationCountry?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  slots?: InputMaybe<DriverSlotRelateToManyForCreateInput>;
  stripeAccountId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type DriverOrderByInput = {
  availability?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  locationCity?: InputMaybe<OrderDirection>;
  locationCountry?: InputMaybe<OrderDirection>;
  locationName?: InputMaybe<OrderDirection>;
  radius?: InputMaybe<OrderDirection>;
  stripeAccountId?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type DriverRelateToOneForCreateInput = {
  connect?: InputMaybe<DriverWhereUniqueInput>;
  create?: InputMaybe<DriverCreateInput>;
};

export type DriverRelateToOneForUpdateInput = {
  connect?: InputMaybe<DriverWhereUniqueInput>;
  create?: InputMaybe<DriverCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DriverSlot = {
  __typename?: 'DriverSlot';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fromTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isoWeekday?: Maybe<Scalars['Int']['output']>;
  toTime?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type DriverSlotCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fromTime?: InputMaybe<Scalars['Int']['input']>;
  isoWeekday?: InputMaybe<Scalars['Int']['input']>;
  toTime?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type DriverSlotManyRelationFilter = {
  every?: InputMaybe<DriverSlotWhereInput>;
  none?: InputMaybe<DriverSlotWhereInput>;
  some?: InputMaybe<DriverSlotWhereInput>;
};

export type DriverSlotOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  fromTime?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isoWeekday?: InputMaybe<OrderDirection>;
  toTime?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type DriverSlotRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<DriverSlotWhereUniqueInput>>;
  create?: InputMaybe<Array<DriverSlotCreateInput>>;
};

export type DriverSlotRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<DriverSlotWhereUniqueInput>>;
  create?: InputMaybe<Array<DriverSlotCreateInput>>;
  disconnect?: InputMaybe<Array<DriverSlotWhereUniqueInput>>;
  set?: InputMaybe<Array<DriverSlotWhereUniqueInput>>;
};

export type DriverSlotUpdateArgs = {
  data: DriverSlotUpdateInput;
  where: DriverSlotWhereUniqueInput;
};

export type DriverSlotUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fromTime?: InputMaybe<Scalars['Int']['input']>;
  isoWeekday?: InputMaybe<Scalars['Int']['input']>;
  toTime?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type DriverSlotWhereInput = {
  AND?: InputMaybe<Array<DriverSlotWhereInput>>;
  NOT?: InputMaybe<Array<DriverSlotWhereInput>>;
  OR?: InputMaybe<Array<DriverSlotWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  fromTime?: InputMaybe<IntFilter>;
  id?: InputMaybe<IdFilter>;
  isoWeekday?: InputMaybe<IntFilter>;
  toTime?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type DriverSlotWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DriverTripArroundType = {
  __typename?: 'DriverTripArroundType';
  distance: Scalars['Int']['output'];
  trip?: Maybe<Trip>;
};

export type DriverUpdateArgs = {
  data: DriverUpdateInput;
  where: DriverWhereUniqueInput;
};

export type DriverUpdateInput = {
  availability?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
  locationCity?: InputMaybe<Scalars['String']['input']>;
  locationCountry?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  radius?: InputMaybe<Scalars['Int']['input']>;
  slots?: InputMaybe<DriverSlotRelateToManyForUpdateInput>;
  stripeAccountId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type DriverWhereInput = {
  AND?: InputMaybe<Array<DriverWhereInput>>;
  NOT?: InputMaybe<Array<DriverWhereInput>>;
  OR?: InputMaybe<Array<DriverWhereInput>>;
  availability?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  locationCity?: InputMaybe<StringFilter>;
  locationCountry?: InputMaybe<StringFilter>;
  locationName?: InputMaybe<StringFilter>;
  radius?: InputMaybe<IntFilter>;
  slots?: InputMaybe<DriverSlotManyRelationFilter>;
  stripeAccountId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type DriverWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type DrivingLicense = {
  __typename?: 'DrivingLicense';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  obtentionYear?: Maybe<Scalars['Int']['output']>;
  picture?: Maybe<File>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type DrivingLicenseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  obtentionYear?: InputMaybe<Scalars['Int']['input']>;
  picture?: InputMaybe<FileRelateToOneForCreateInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type DrivingLicenseOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  expirationDatetimeUtc?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isExpired?: InputMaybe<OrderDirection>;
  obtentionYear?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type DrivingLicenseRelateToOneForCreateInput = {
  connect?: InputMaybe<DrivingLicenseWhereUniqueInput>;
  create?: InputMaybe<DrivingLicenseCreateInput>;
};

export type DrivingLicenseRelateToOneForUpdateInput = {
  connect?: InputMaybe<DrivingLicenseWhereUniqueInput>;
  create?: InputMaybe<DrivingLicenseCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DrivingLicenseUpdateArgs = {
  data: DrivingLicenseUpdateInput;
  where: DrivingLicenseWhereUniqueInput;
};

export type DrivingLicenseUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  obtentionYear?: InputMaybe<Scalars['Int']['input']>;
  picture?: InputMaybe<FileRelateToOneForUpdateInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type DrivingLicenseWhereInput = {
  AND?: InputMaybe<Array<DrivingLicenseWhereInput>>;
  NOT?: InputMaybe<Array<DrivingLicenseWhereInput>>;
  OR?: InputMaybe<Array<DrivingLicenseWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  expirationDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isExpired?: InputMaybe<BooleanFilter>;
  obtentionYear?: InputMaybe<IntNullableFilter>;
  picture?: InputMaybe<FileWhereInput>;
  state?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type DrivingLicenseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type Equipment = {
  __typename?: 'Equipment';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  helmetType?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  size?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type EquipmentCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  helmetType?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type EquipmentManyRelationFilter = {
  every?: InputMaybe<EquipmentWhereInput>;
  none?: InputMaybe<EquipmentWhereInput>;
  some?: InputMaybe<EquipmentWhereInput>;
};

export type EquipmentOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  helmetType?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  size?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type EquipmentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<EquipmentWhereUniqueInput>>;
  create?: InputMaybe<Array<EquipmentCreateInput>>;
};

export type EquipmentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<EquipmentWhereUniqueInput>>;
  create?: InputMaybe<Array<EquipmentCreateInput>>;
  disconnect?: InputMaybe<Array<EquipmentWhereUniqueInput>>;
  set?: InputMaybe<Array<EquipmentWhereUniqueInput>>;
};

export type EquipmentUpdateArgs = {
  data: EquipmentUpdateInput;
  where: EquipmentWhereUniqueInput;
};

export type EquipmentUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  helmetType?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type EquipmentWhereInput = {
  AND?: InputMaybe<Array<EquipmentWhereInput>>;
  NOT?: InputMaybe<Array<EquipmentWhereInput>>;
  OR?: InputMaybe<Array<EquipmentWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  helmetType?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  size?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type EquipmentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type File = {
  __typename?: 'File';
  contentLength?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fullpath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mimetype?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type FileCreateInput = {
  contentLength?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fullpath?: InputMaybe<Scalars['String']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type FileOrderByInput = {
  contentLength?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  fullpath?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  mimetype?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type FileRelateToOneForCreateInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  create?: InputMaybe<FileCreateInput>;
};

export type FileRelateToOneForUpdateInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  create?: InputMaybe<FileCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FileUpdateArgs = {
  data: FileUpdateInput;
  where: FileWhereUniqueInput;
};

export type FileUpdateInput = {
  contentLength?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fullpath?: InputMaybe<Scalars['String']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type FileWhereInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  contentLength?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  fullpath?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  mimetype?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type FileWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Insurance = {
  __typename?: 'Insurance';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  picture?: Maybe<File>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type InsuranceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<FileRelateToOneForCreateInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type InsuranceOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  expirationDatetimeUtc?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isExpired?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type InsuranceRelateToOneForCreateInput = {
  connect?: InputMaybe<InsuranceWhereUniqueInput>;
  create?: InputMaybe<InsuranceCreateInput>;
};

export type InsuranceRelateToOneForUpdateInput = {
  connect?: InputMaybe<InsuranceWhereUniqueInput>;
  create?: InputMaybe<InsuranceCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InsuranceUpdateArgs = {
  data: InsuranceUpdateInput;
  where: InsuranceWhereUniqueInput;
};

export type InsuranceUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<FileRelateToOneForUpdateInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type InsuranceWhereInput = {
  AND?: InputMaybe<Array<InsuranceWhereInput>>;
  NOT?: InputMaybe<Array<InsuranceWhereInput>>;
  OR?: InputMaybe<Array<InsuranceWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  expirationDatetimeUtc?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  isExpired?: InputMaybe<BooleanFilter>;
  picture?: InputMaybe<FileWhereInput>;
  state?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type InsuranceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export type KeystoneAdminUiFieldMetaCreateViewFieldMode =
  | 'edit'
  | 'hidden';

export type KeystoneAdminUiFieldMetaIsNonNull =
  | 'create'
  | 'read'
  | 'update';

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export type KeystoneAdminUiFieldMetaItemViewFieldMode =
  | 'edit'
  | 'hidden'
  | 'read';

export type KeystoneAdminUiFieldMetaItemViewFieldPosition =
  | 'form'
  | 'sidebar';

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export type KeystoneAdminUiFieldMetaListViewFieldMode =
  | 'hidden'
  | 'read';

export type KeystoneAdminUiGraphQl = {
  __typename?: 'KeystoneAdminUIGraphQL';
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: 'KeystoneAdminUIGraphQLNames';
  createInputName: Scalars['String']['output'];
  createManyMutationName: Scalars['String']['output'];
  createMutationName: Scalars['String']['output'];
  deleteManyMutationName: Scalars['String']['output'];
  deleteMutationName: Scalars['String']['output'];
  itemQueryName: Scalars['String']['output'];
  listOrderName: Scalars['String']['output'];
  listQueryCountName: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  outputTypeName: Scalars['String']['output'];
  relateToManyForCreateInputName: Scalars['String']['output'];
  relateToManyForUpdateInputName: Scalars['String']['output'];
  relateToOneForCreateInputName: Scalars['String']['output'];
  relateToOneForUpdateInputName: Scalars['String']['output'];
  updateInputName: Scalars['String']['output'];
  updateManyInputName: Scalars['String']['output'];
  updateManyMutationName: Scalars['String']['output'];
  updateMutationName: Scalars['String']['output'];
  whereInputName: Scalars['String']['output'];
  whereUniqueInputName: Scalars['String']['output'];
};

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSearchFields: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export type KeystoneAdminUiSortDirection =
  | 'ASC'
  | 'DESC';

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Location = {
  __typename?: 'Location';
  gpid?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['JSON']['output']>;
};

export type LocationCreateInput = {
  gpid?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
};

export type LocationOrderByInput = {
  gpid?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type LocationUpdateArgs = {
  data: LocationUpdateInput;
  where: LocationWhereUniqueInput;
};

export type LocationUpdateInput = {
  gpid?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
};

export type LocationWhereInput = {
  AND?: InputMaybe<Array<LocationWhereInput>>;
  NOT?: InputMaybe<Array<LocationWhereInput>>;
  OR?: InputMaybe<Array<LocationWhereInput>>;
  gpid?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
};

export type LocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Message = {
  __typename?: 'Message';
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type MessageCreateInput = {
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type MessageManyRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  message?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type MessageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  create?: InputMaybe<Array<MessageCreateInput>>;
};

export type MessageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  create?: InputMaybe<Array<MessageCreateInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
};

export type MessageUpdateArgs = {
  data: MessageUpdateInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateInput = {
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  course?: InputMaybe<CourseWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  message?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type MessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBankAccount?: Maybe<Scalars['ID']['output']>;
  addPushToken?: Maybe<AddPushTokenType>;
  applyAffiliationCode: Affiliation;
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  cancelCourse?: Maybe<Scalars['Boolean']['output']>;
  clearPushTokens?: Maybe<ClearPushTokensType>;
  createAddress?: Maybe<Address>;
  createAddresses?: Maybe<Array<Maybe<Address>>>;
  createAdminLog?: Maybe<AdminLog>;
  createAdminLogs?: Maybe<Array<Maybe<AdminLog>>>;
  createAffiliation?: Maybe<Affiliation>;
  createAffiliations?: Maybe<Array<Maybe<Affiliation>>>;
  createCertificate?: Maybe<Certificate>;
  createCertificates?: Maybe<Array<Maybe<Certificate>>>;
  createCourse?: Maybe<Course>;
  createCourses?: Maybe<Array<Maybe<Course>>>;
  createDriver?: Maybe<Driver>;
  createDriverSlot?: Maybe<DriverSlot>;
  createDriverSlots?: Maybe<Array<Maybe<DriverSlot>>>;
  createDrivers?: Maybe<Array<Maybe<Driver>>>;
  createDrivingLicense?: Maybe<DrivingLicense>;
  createDrivingLicenses?: Maybe<Array<Maybe<DrivingLicense>>>;
  createEquipment?: Maybe<Equipment>;
  createFile?: Maybe<File>;
  createFiles?: Maybe<Array<Maybe<File>>>;
  createInsurance?: Maybe<Insurance>;
  createInsurances?: Maybe<Array<Maybe<Insurance>>>;
  createLocation?: Maybe<Location>;
  createLocations?: Maybe<Array<Maybe<Location>>>;
  createMessage?: Maybe<Message>;
  createMessages?: Maybe<Array<Maybe<Message>>>;
  createNode?: Maybe<Node>;
  createNodes?: Maybe<Array<Maybe<Node>>>;
  createNotification?: Maybe<Notification>;
  createNotifications?: Maybe<Array<Maybe<Notification>>>;
  createPage?: Maybe<Page>;
  createPageSection?: Maybe<PageSection>;
  createPageSections?: Maybe<Array<Maybe<PageSection>>>;
  createPages?: Maybe<Array<Maybe<Page>>>;
  createPayment?: Maybe<Payment>;
  createPayments?: Maybe<Array<Maybe<Payment>>>;
  createRating?: Maybe<Rating>;
  createRatings?: Maybe<Array<Maybe<Rating>>>;
  createRegistrationDocument?: Maybe<RegistrationDocument>;
  createRegistrationDocuments?: Maybe<Array<Maybe<RegistrationDocument>>>;
  createTicket?: Maybe<Ticket>;
  createTicketMessage?: Maybe<TicketMessage>;
  createTicketMessages?: Maybe<Array<Maybe<TicketMessage>>>;
  createTicketObject?: Maybe<TicketObject>;
  createTicketObjects?: Maybe<Array<Maybe<TicketObject>>>;
  createTickets?: Maybe<Array<Maybe<Ticket>>>;
  createTrip?: Maybe<Trip>;
  createTrips?: Maybe<Array<Maybe<Trip>>>;
  createUser?: Maybe<User>;
  createUserCode?: Maybe<UserCode>;
  createUserCodes?: Maybe<Array<Maybe<UserCode>>>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  createVehicule?: Maybe<Vehicule>;
  createVehicules?: Maybe<Array<Maybe<Vehicule>>>;
  createequipments?: Maybe<Array<Maybe<Equipment>>>;
  deleteAddress?: Maybe<Address>;
  deleteAddresses?: Maybe<Array<Maybe<Address>>>;
  deleteAdminLog?: Maybe<AdminLog>;
  deleteAdminLogs?: Maybe<Array<Maybe<AdminLog>>>;
  deleteAffiliation?: Maybe<Affiliation>;
  deleteAffiliations?: Maybe<Array<Maybe<Affiliation>>>;
  deleteCard: Scalars['Boolean']['output'];
  deleteCertificate?: Maybe<Certificate>;
  deleteCertificates?: Maybe<Array<Maybe<Certificate>>>;
  deleteCourse?: Maybe<Course>;
  deleteCourses?: Maybe<Array<Maybe<Course>>>;
  deleteDriver?: Maybe<Driver>;
  deleteDriverSlot?: Maybe<DriverSlot>;
  deleteDriverSlots?: Maybe<Array<Maybe<DriverSlot>>>;
  deleteDrivers?: Maybe<Array<Maybe<Driver>>>;
  deleteDrivingLicense?: Maybe<DrivingLicense>;
  deleteDrivingLicenses?: Maybe<Array<Maybe<DrivingLicense>>>;
  deleteEquipment?: Maybe<Equipment>;
  deleteFile?: Maybe<File>;
  deleteFiles?: Maybe<Array<Maybe<File>>>;
  deleteInsurance?: Maybe<Insurance>;
  deleteInsurances?: Maybe<Array<Maybe<Insurance>>>;
  deleteLocation?: Maybe<Location>;
  deleteLocations?: Maybe<Array<Maybe<Location>>>;
  deleteMessage?: Maybe<Message>;
  deleteMessages?: Maybe<Array<Maybe<Message>>>;
  /**
   * Marque le compte de l'utilisateur courant comme supprimé.
   * - Vérifie le mot de passe (re-confirmation).
   * - Refuse si engagement actif (course acceptée, paiement en cours,
   *   balance Stripe Connect non transférée).
   * - Anonymise les données seulement plus tard (TODO : cron de hard
   *   anonymization). En V1, le User reste consultable pour réactivation.
   */
  deleteMyAccount: DeleteMyAccountResult;
  deleteNode?: Maybe<Node>;
  deleteNodes?: Maybe<Array<Maybe<Node>>>;
  deleteNotification?: Maybe<Notification>;
  deleteNotifications?: Maybe<Array<Maybe<Notification>>>;
  deletePage?: Maybe<Page>;
  deletePageSection?: Maybe<PageSection>;
  deletePageSections?: Maybe<Array<Maybe<PageSection>>>;
  deletePages?: Maybe<Array<Maybe<Page>>>;
  deletePayment?: Maybe<Payment>;
  deletePayments?: Maybe<Array<Maybe<Payment>>>;
  deleteRating?: Maybe<Rating>;
  deleteRatings?: Maybe<Array<Maybe<Rating>>>;
  deleteRegistrationDocument?: Maybe<RegistrationDocument>;
  deleteRegistrationDocuments?: Maybe<Array<Maybe<RegistrationDocument>>>;
  deleteTicket?: Maybe<Ticket>;
  deleteTicketMessage?: Maybe<TicketMessage>;
  deleteTicketMessages?: Maybe<Array<Maybe<TicketMessage>>>;
  deleteTicketObject?: Maybe<TicketObject>;
  deleteTicketObjects?: Maybe<Array<Maybe<TicketObject>>>;
  deleteTickets?: Maybe<Array<Maybe<Ticket>>>;
  deleteTrip?: Maybe<Trip>;
  deleteTrips?: Maybe<Array<Maybe<Trip>>>;
  deleteUser?: Maybe<User>;
  deleteUserCode?: Maybe<UserCode>;
  deleteUserCodes?: Maybe<Array<Maybe<UserCode>>>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  deleteVehicule?: Maybe<Vehicule>;
  deleteVehicules?: Maybe<Array<Maybe<Vehicule>>>;
  deleteequipments?: Maybe<Array<Maybe<Equipment>>>;
  enableUser?: Maybe<User>;
  endSession: Scalars['Boolean']['output'];
  pay: PayType;
  /**
   * Réactive le compte de l'utilisateur courant (annule le soft-delete
   * posé par deleteMyAccount). L'user doit être logué (le mdp n'a jamais
   * changé pendant la suppression, donc le re-login fonctionne).
   */
  reactivateMyAccount: Scalars['Boolean']['output'];
  resetPassword: ResetPasswordType;
  sendUserCode: SendUserCodeType;
  terminateCourse?: Maybe<Scalars['Boolean']['output']>;
  updateAddress?: Maybe<Address>;
  updateAddresses?: Maybe<Array<Maybe<Address>>>;
  updateAdminLog?: Maybe<AdminLog>;
  updateAdminLogs?: Maybe<Array<Maybe<AdminLog>>>;
  updateAffiliation?: Maybe<Affiliation>;
  updateAffiliations?: Maybe<Array<Maybe<Affiliation>>>;
  updateCertificate?: Maybe<Certificate>;
  updateCertificates?: Maybe<Array<Maybe<Certificate>>>;
  updateCourse?: Maybe<Course>;
  updateCourses?: Maybe<Array<Maybe<Course>>>;
  updateDriver?: Maybe<Driver>;
  updateDriverSlot?: Maybe<DriverSlot>;
  updateDriverSlots?: Maybe<Array<Maybe<DriverSlot>>>;
  updateDrivers?: Maybe<Array<Maybe<Driver>>>;
  updateDrivingLicense?: Maybe<DrivingLicense>;
  updateDrivingLicenses?: Maybe<Array<Maybe<DrivingLicense>>>;
  updateEquipment?: Maybe<Equipment>;
  updateFile?: Maybe<File>;
  updateFiles?: Maybe<Array<Maybe<File>>>;
  updateInsurance?: Maybe<Insurance>;
  updateInsurances?: Maybe<Array<Maybe<Insurance>>>;
  updateLocation?: Maybe<Location>;
  updateLocations?: Maybe<Array<Maybe<Location>>>;
  updateMessage?: Maybe<Message>;
  updateMessages?: Maybe<Array<Maybe<Message>>>;
  updateNode?: Maybe<Node>;
  updateNodes?: Maybe<Array<Maybe<Node>>>;
  updateNotification?: Maybe<Notification>;
  updateNotifications?: Maybe<Array<Maybe<Notification>>>;
  updatePage?: Maybe<Page>;
  updatePageSection?: Maybe<PageSection>;
  updatePageSections?: Maybe<Array<Maybe<PageSection>>>;
  updatePages?: Maybe<Array<Maybe<Page>>>;
  updatePassword: UpdatePasswordType;
  updatePayment?: Maybe<Payment>;
  updatePayments?: Maybe<Array<Maybe<Payment>>>;
  updateRating?: Maybe<Rating>;
  updateRatings?: Maybe<Array<Maybe<Rating>>>;
  updateRegistrationDocument?: Maybe<RegistrationDocument>;
  updateRegistrationDocuments?: Maybe<Array<Maybe<RegistrationDocument>>>;
  updateTicket?: Maybe<Ticket>;
  updateTicketMessage?: Maybe<TicketMessage>;
  updateTicketMessages?: Maybe<Array<Maybe<TicketMessage>>>;
  updateTicketObject?: Maybe<TicketObject>;
  updateTicketObjects?: Maybe<Array<Maybe<TicketObject>>>;
  updateTickets?: Maybe<Array<Maybe<Ticket>>>;
  updateTrip?: Maybe<Trip>;
  updateTrips?: Maybe<Array<Maybe<Trip>>>;
  updateUser?: Maybe<User>;
  updateUserCode?: Maybe<UserCode>;
  updateUserCodes?: Maybe<Array<Maybe<UserCode>>>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  updateVehicule?: Maybe<Vehicule>;
  updateVehicules?: Maybe<Array<Maybe<Vehicule>>>;
  updateequipments?: Maybe<Array<Maybe<Equipment>>>;
  validateUserCode: Scalars['Boolean']['output'];
};


export type MutationAddBankAccountArgs = {
  iban: Scalars['String']['input'];
  ownerFirstname: Scalars['String']['input'];
  ownerLastname: Scalars['String']['input'];
};


export type MutationAddPushTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationApplyAffiliationCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCancelCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type MutationCreateAddressArgs = {
  data: AddressCreateInput;
};


export type MutationCreateAddressesArgs = {
  data: Array<AddressCreateInput>;
};


export type MutationCreateAdminLogArgs = {
  data: AdminLogCreateInput;
};


export type MutationCreateAdminLogsArgs = {
  data: Array<AdminLogCreateInput>;
};


export type MutationCreateAffiliationArgs = {
  data: AffiliationCreateInput;
};


export type MutationCreateAffiliationsArgs = {
  data: Array<AffiliationCreateInput>;
};


export type MutationCreateCertificateArgs = {
  data: CertificateCreateInput;
};


export type MutationCreateCertificatesArgs = {
  data: Array<CertificateCreateInput>;
};


export type MutationCreateCourseArgs = {
  data: CourseCreateInput;
};


export type MutationCreateCoursesArgs = {
  data: Array<CourseCreateInput>;
};


export type MutationCreateDriverArgs = {
  data: DriverCreateInput;
};


export type MutationCreateDriverSlotArgs = {
  data: DriverSlotCreateInput;
};


export type MutationCreateDriverSlotsArgs = {
  data: Array<DriverSlotCreateInput>;
};


export type MutationCreateDriversArgs = {
  data: Array<DriverCreateInput>;
};


export type MutationCreateDrivingLicenseArgs = {
  data: DrivingLicenseCreateInput;
};


export type MutationCreateDrivingLicensesArgs = {
  data: Array<DrivingLicenseCreateInput>;
};


export type MutationCreateEquipmentArgs = {
  data: EquipmentCreateInput;
};


export type MutationCreateFileArgs = {
  data: FileCreateInput;
};


export type MutationCreateFilesArgs = {
  data: Array<FileCreateInput>;
};


export type MutationCreateInsuranceArgs = {
  data: InsuranceCreateInput;
};


export type MutationCreateInsurancesArgs = {
  data: Array<InsuranceCreateInput>;
};


export type MutationCreateLocationArgs = {
  data: LocationCreateInput;
};


export type MutationCreateLocationsArgs = {
  data: Array<LocationCreateInput>;
};


export type MutationCreateMessageArgs = {
  data: MessageCreateInput;
};


export type MutationCreateMessagesArgs = {
  data: Array<MessageCreateInput>;
};


export type MutationCreateNodeArgs = {
  data: NodeCreateInput;
};


export type MutationCreateNodesArgs = {
  data: Array<NodeCreateInput>;
};


export type MutationCreateNotificationArgs = {
  data: NotificationCreateInput;
};


export type MutationCreateNotificationsArgs = {
  data: Array<NotificationCreateInput>;
};


export type MutationCreatePageArgs = {
  data: PageCreateInput;
};


export type MutationCreatePageSectionArgs = {
  data: PageSectionCreateInput;
};


export type MutationCreatePageSectionsArgs = {
  data: Array<PageSectionCreateInput>;
};


export type MutationCreatePagesArgs = {
  data: Array<PageCreateInput>;
};


export type MutationCreatePaymentArgs = {
  data: PaymentCreateInput;
};


export type MutationCreatePaymentsArgs = {
  data: Array<PaymentCreateInput>;
};


export type MutationCreateRatingArgs = {
  data: RatingCreateInput;
};


export type MutationCreateRatingsArgs = {
  data: Array<RatingCreateInput>;
};


export type MutationCreateRegistrationDocumentArgs = {
  data: RegistrationDocumentCreateInput;
};


export type MutationCreateRegistrationDocumentsArgs = {
  data: Array<RegistrationDocumentCreateInput>;
};


export type MutationCreateTicketArgs = {
  data: TicketCreateInput;
};


export type MutationCreateTicketMessageArgs = {
  data: TicketMessageCreateInput;
};


export type MutationCreateTicketMessagesArgs = {
  data: Array<TicketMessageCreateInput>;
};


export type MutationCreateTicketObjectArgs = {
  data: TicketObjectCreateInput;
};


export type MutationCreateTicketObjectsArgs = {
  data: Array<TicketObjectCreateInput>;
};


export type MutationCreateTicketsArgs = {
  data: Array<TicketCreateInput>;
};


export type MutationCreateTripArgs = {
  data: TripCreateInput;
};


export type MutationCreateTripsArgs = {
  data: Array<TripCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserCodeArgs = {
  data: UserCodeCreateInput;
};


export type MutationCreateUserCodesArgs = {
  data: Array<UserCodeCreateInput>;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationCreateVehiculeArgs = {
  data: VehiculeCreateInput;
};


export type MutationCreateVehiculesArgs = {
  data: Array<VehiculeCreateInput>;
};


export type MutationCreateequipmentsArgs = {
  data: Array<EquipmentCreateInput>;
};


export type MutationDeleteAddressArgs = {
  where: AddressWhereUniqueInput;
};


export type MutationDeleteAddressesArgs = {
  where: Array<AddressWhereUniqueInput>;
};


export type MutationDeleteAdminLogArgs = {
  where: AdminLogWhereUniqueInput;
};


export type MutationDeleteAdminLogsArgs = {
  where: Array<AdminLogWhereUniqueInput>;
};


export type MutationDeleteAffiliationArgs = {
  where: AffiliationWhereUniqueInput;
};


export type MutationDeleteAffiliationsArgs = {
  where: Array<AffiliationWhereUniqueInput>;
};


export type MutationDeleteCardArgs = {
  cardId: Scalars['ID']['input'];
};


export type MutationDeleteCertificateArgs = {
  where: CertificateWhereUniqueInput;
};


export type MutationDeleteCertificatesArgs = {
  where: Array<CertificateWhereUniqueInput>;
};


export type MutationDeleteCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type MutationDeleteCoursesArgs = {
  where: Array<CourseWhereUniqueInput>;
};


export type MutationDeleteDriverArgs = {
  where: DriverWhereUniqueInput;
};


export type MutationDeleteDriverSlotArgs = {
  where: DriverSlotWhereUniqueInput;
};


export type MutationDeleteDriverSlotsArgs = {
  where: Array<DriverSlotWhereUniqueInput>;
};


export type MutationDeleteDriversArgs = {
  where: Array<DriverWhereUniqueInput>;
};


export type MutationDeleteDrivingLicenseArgs = {
  where: DrivingLicenseWhereUniqueInput;
};


export type MutationDeleteDrivingLicensesArgs = {
  where: Array<DrivingLicenseWhereUniqueInput>;
};


export type MutationDeleteEquipmentArgs = {
  where: EquipmentWhereUniqueInput;
};


export type MutationDeleteFileArgs = {
  where: FileWhereUniqueInput;
};


export type MutationDeleteFilesArgs = {
  where: Array<FileWhereUniqueInput>;
};


export type MutationDeleteInsuranceArgs = {
  where: InsuranceWhereUniqueInput;
};


export type MutationDeleteInsurancesArgs = {
  where: Array<InsuranceWhereUniqueInput>;
};


export type MutationDeleteLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type MutationDeleteLocationsArgs = {
  where: Array<LocationWhereUniqueInput>;
};


export type MutationDeleteMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type MutationDeleteMessagesArgs = {
  where: Array<MessageWhereUniqueInput>;
};


export type MutationDeleteMyAccountArgs = {
  password: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteNodeArgs = {
  where: NodeWhereUniqueInput;
};


export type MutationDeleteNodesArgs = {
  where: Array<NodeWhereUniqueInput>;
};


export type MutationDeleteNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type MutationDeleteNotificationsArgs = {
  where: Array<NotificationWhereUniqueInput>;
};


export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};


export type MutationDeletePageSectionArgs = {
  where: PageSectionWhereUniqueInput;
};


export type MutationDeletePageSectionsArgs = {
  where: Array<PageSectionWhereUniqueInput>;
};


export type MutationDeletePagesArgs = {
  where: Array<PageWhereUniqueInput>;
};


export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationDeletePaymentsArgs = {
  where: Array<PaymentWhereUniqueInput>;
};


export type MutationDeleteRatingArgs = {
  where: RatingWhereUniqueInput;
};


export type MutationDeleteRatingsArgs = {
  where: Array<RatingWhereUniqueInput>;
};


export type MutationDeleteRegistrationDocumentArgs = {
  where: RegistrationDocumentWhereUniqueInput;
};


export type MutationDeleteRegistrationDocumentsArgs = {
  where: Array<RegistrationDocumentWhereUniqueInput>;
};


export type MutationDeleteTicketArgs = {
  where: TicketWhereUniqueInput;
};


export type MutationDeleteTicketMessageArgs = {
  where: TicketMessageWhereUniqueInput;
};


export type MutationDeleteTicketMessagesArgs = {
  where: Array<TicketMessageWhereUniqueInput>;
};


export type MutationDeleteTicketObjectArgs = {
  where: TicketObjectWhereUniqueInput;
};


export type MutationDeleteTicketObjectsArgs = {
  where: Array<TicketObjectWhereUniqueInput>;
};


export type MutationDeleteTicketsArgs = {
  where: Array<TicketWhereUniqueInput>;
};


export type MutationDeleteTripArgs = {
  where: TripWhereUniqueInput;
};


export type MutationDeleteTripsArgs = {
  where: Array<TripWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserCodeArgs = {
  where: UserCodeWhereUniqueInput;
};


export type MutationDeleteUserCodesArgs = {
  where: Array<UserCodeWhereUniqueInput>;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationDeleteVehiculeArgs = {
  where: VehiculeWhereUniqueInput;
};


export type MutationDeleteVehiculesArgs = {
  where: Array<VehiculeWhereUniqueInput>;
};


export type MutationDeleteequipmentsArgs = {
  where: Array<EquipmentWhereUniqueInput>;
};


export type MutationPayArgs = {
  paymentId: Scalars['ID']['input'];
  secure?: Scalars['Boolean']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendUserCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationTerminateCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type MutationUpdateAddressArgs = {
  data: AddressUpdateInput;
  where: AddressWhereUniqueInput;
};


export type MutationUpdateAddressesArgs = {
  data: Array<AddressUpdateArgs>;
};


export type MutationUpdateAdminLogArgs = {
  data: AdminLogUpdateInput;
  where: AdminLogWhereUniqueInput;
};


export type MutationUpdateAdminLogsArgs = {
  data: Array<AdminLogUpdateArgs>;
};


export type MutationUpdateAffiliationArgs = {
  data: AffiliationUpdateInput;
  where: AffiliationWhereUniqueInput;
};


export type MutationUpdateAffiliationsArgs = {
  data: Array<AffiliationUpdateArgs>;
};


export type MutationUpdateCertificateArgs = {
  data: CertificateUpdateInput;
  where: CertificateWhereUniqueInput;
};


export type MutationUpdateCertificatesArgs = {
  data: Array<CertificateUpdateArgs>;
};


export type MutationUpdateCourseArgs = {
  data: CourseUpdateInput;
  where: CourseWhereUniqueInput;
};


export type MutationUpdateCoursesArgs = {
  data: Array<CourseUpdateArgs>;
};


export type MutationUpdateDriverArgs = {
  data: DriverUpdateInput;
  where: DriverWhereUniqueInput;
};


export type MutationUpdateDriverSlotArgs = {
  data: DriverSlotUpdateInput;
  where: DriverSlotWhereUniqueInput;
};


export type MutationUpdateDriverSlotsArgs = {
  data: Array<DriverSlotUpdateArgs>;
};


export type MutationUpdateDriversArgs = {
  data: Array<DriverUpdateArgs>;
};


export type MutationUpdateDrivingLicenseArgs = {
  data: DrivingLicenseUpdateInput;
  where: DrivingLicenseWhereUniqueInput;
};


export type MutationUpdateDrivingLicensesArgs = {
  data: Array<DrivingLicenseUpdateArgs>;
};


export type MutationUpdateEquipmentArgs = {
  data: EquipmentUpdateInput;
  where: EquipmentWhereUniqueInput;
};


export type MutationUpdateFileArgs = {
  data: FileUpdateInput;
  where: FileWhereUniqueInput;
};


export type MutationUpdateFilesArgs = {
  data: Array<FileUpdateArgs>;
};


export type MutationUpdateInsuranceArgs = {
  data: InsuranceUpdateInput;
  where: InsuranceWhereUniqueInput;
};


export type MutationUpdateInsurancesArgs = {
  data: Array<InsuranceUpdateArgs>;
};


export type MutationUpdateLocationArgs = {
  data: LocationUpdateInput;
  where: LocationWhereUniqueInput;
};


export type MutationUpdateLocationsArgs = {
  data: Array<LocationUpdateArgs>;
};


export type MutationUpdateMessageArgs = {
  data: MessageUpdateInput;
  where: MessageWhereUniqueInput;
};


export type MutationUpdateMessagesArgs = {
  data: Array<MessageUpdateArgs>;
};


export type MutationUpdateNodeArgs = {
  data: NodeUpdateInput;
  where: NodeWhereUniqueInput;
};


export type MutationUpdateNodesArgs = {
  data: Array<NodeUpdateArgs>;
};


export type MutationUpdateNotificationArgs = {
  data: NotificationUpdateInput;
  where: NotificationWhereUniqueInput;
};


export type MutationUpdateNotificationsArgs = {
  data: Array<NotificationUpdateArgs>;
};


export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};


export type MutationUpdatePageSectionArgs = {
  data: PageSectionUpdateInput;
  where: PageSectionWhereUniqueInput;
};


export type MutationUpdatePageSectionsArgs = {
  data: Array<PageSectionUpdateArgs>;
};


export type MutationUpdatePagesArgs = {
  data: Array<PageUpdateArgs>;
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdatePaymentArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};


export type MutationUpdatePaymentsArgs = {
  data: Array<PaymentUpdateArgs>;
};


export type MutationUpdateRatingArgs = {
  data: RatingUpdateInput;
  where: RatingWhereUniqueInput;
};


export type MutationUpdateRatingsArgs = {
  data: Array<RatingUpdateArgs>;
};


export type MutationUpdateRegistrationDocumentArgs = {
  data: RegistrationDocumentUpdateInput;
  where: RegistrationDocumentWhereUniqueInput;
};


export type MutationUpdateRegistrationDocumentsArgs = {
  data: Array<RegistrationDocumentUpdateArgs>;
};


export type MutationUpdateTicketArgs = {
  data: TicketUpdateInput;
  where: TicketWhereUniqueInput;
};


export type MutationUpdateTicketMessageArgs = {
  data: TicketMessageUpdateInput;
  where: TicketMessageWhereUniqueInput;
};


export type MutationUpdateTicketMessagesArgs = {
  data: Array<TicketMessageUpdateArgs>;
};


export type MutationUpdateTicketObjectArgs = {
  data: TicketObjectUpdateInput;
  where: TicketObjectWhereUniqueInput;
};


export type MutationUpdateTicketObjectsArgs = {
  data: Array<TicketObjectUpdateArgs>;
};


export type MutationUpdateTicketsArgs = {
  data: Array<TicketUpdateArgs>;
};


export type MutationUpdateTripArgs = {
  data: TripUpdateInput;
  where: TripWhereUniqueInput;
};


export type MutationUpdateTripsArgs = {
  data: Array<TripUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserCodeArgs = {
  data: UserCodeUpdateInput;
  where: UserCodeWhereUniqueInput;
};


export type MutationUpdateUserCodesArgs = {
  data: Array<UserCodeUpdateArgs>;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};


export type MutationUpdateVehiculeArgs = {
  data: VehiculeUpdateInput;
  where: VehiculeWhereUniqueInput;
};


export type MutationUpdateVehiculesArgs = {
  data: Array<VehiculeUpdateArgs>;
};


export type MutationUpdateequipmentsArgs = {
  data: Array<EquipmentUpdateArgs>;
};


export type MutationValidateUserCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Node = {
  __typename?: 'Node';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gpid?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['JSON']['output']>;
  locationCity?: Maybe<Scalars['String']['output']>;
  locationCountry?: Maybe<Scalars['String']['output']>;
  locationName?: Maybe<Scalars['String']['output']>;
};

export type NodeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpid?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
  locationCity?: InputMaybe<Scalars['String']['input']>;
  locationCountry?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
};

export type NodeInput = {
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};

export type NodeOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  gpid?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  locationCity?: InputMaybe<OrderDirection>;
  locationCountry?: InputMaybe<OrderDirection>;
  locationName?: InputMaybe<OrderDirection>;
};

export type NodeRelateToOneForCreateInput = {
  connect?: InputMaybe<NodeWhereUniqueInput>;
  create?: InputMaybe<NodeCreateInput>;
};

export type NodeRelateToOneForUpdateInput = {
  connect?: InputMaybe<NodeWhereUniqueInput>;
  create?: InputMaybe<NodeCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NodeUpdateArgs = {
  data: NodeUpdateInput;
  where: NodeWhereUniqueInput;
};

export type NodeUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gpid?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['JSON']['input']>;
  locationCity?: InputMaybe<Scalars['String']['input']>;
  locationCountry?: InputMaybe<Scalars['String']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
};

export type NodeWhereInput = {
  AND?: InputMaybe<Array<NodeWhereInput>>;
  NOT?: InputMaybe<Array<NodeWhereInput>>;
  OR?: InputMaybe<Array<NodeWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  gpid?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  locationCity?: InputMaybe<StringFilter>;
  locationCountry?: InputMaybe<StringFilter>;
  locationName?: InputMaybe<StringFilter>;
};

export type NodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  itemId?: Maybe<Scalars['String']['output']>;
  notification?: Maybe<Scalars['String']['output']>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['JSON']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type NotificationCreateInput = {
  itemId?: InputMaybe<Scalars['String']['input']>;
  notification?: InputMaybe<Scalars['String']['input']>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['JSON']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type NotificationOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  itemId?: InputMaybe<OrderDirection>;
  notification?: InputMaybe<OrderDirection>;
  sentAt?: InputMaybe<OrderDirection>;
  userId?: InputMaybe<OrderDirection>;
};

export type NotificationUpdateArgs = {
  data: NotificationUpdateInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateInput = {
  itemId?: InputMaybe<Scalars['String']['input']>;
  notification?: InputMaybe<Scalars['String']['input']>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['JSON']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  id?: InputMaybe<IdFilter>;
  itemId?: InputMaybe<StringNullableFilter>;
  notification?: InputMaybe<StringFilter>;
  sentAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderDirection =
  | 'asc'
  | 'desc';

export type Page = {
  __typename?: 'Page';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  sections?: Maybe<Array<PageSection>>;
  sectionsCount?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type PageSectionsArgs = {
  cursor?: InputMaybe<PageSectionWhereUniqueInput>;
  orderBy?: Array<PageSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PageSectionWhereInput;
};


export type PageSectionsCountArgs = {
  where?: PageSectionWhereInput;
};

export type PageCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<PageSectionRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type PageRelateToOneForCreateInput = {
  connect?: InputMaybe<PageWhereUniqueInput>;
  create?: InputMaybe<PageCreateInput>;
};

export type PageRelateToOneForUpdateInput = {
  connect?: InputMaybe<PageWhereUniqueInput>;
  create?: InputMaybe<PageCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageSection = {
  __typename?: 'PageSection';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  page?: Maybe<Page>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PageSectionCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<PageRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageSectionManyRelationFilter = {
  every?: InputMaybe<PageSectionWhereInput>;
  none?: InputMaybe<PageSectionWhereInput>;
  some?: InputMaybe<PageSectionWhereInput>;
};

export type PageSectionOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type PageSectionRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PageSectionWhereUniqueInput>>;
  create?: InputMaybe<Array<PageSectionCreateInput>>;
};

export type PageSectionRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PageSectionWhereUniqueInput>>;
  create?: InputMaybe<Array<PageSectionCreateInput>>;
  disconnect?: InputMaybe<Array<PageSectionWhereUniqueInput>>;
  set?: InputMaybe<Array<PageSectionWhereUniqueInput>>;
};

export type PageSectionUpdateArgs = {
  data: PageSectionUpdateInput;
  where: PageSectionWhereUniqueInput;
};

export type PageSectionUpdateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<PageRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageSectionWhereInput = {
  AND?: InputMaybe<Array<PageSectionWhereInput>>;
  NOT?: InputMaybe<Array<PageSectionWhereInput>>;
  OR?: InputMaybe<Array<PageSectionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  page?: InputMaybe<PageWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type PageSectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PageUpdateArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};

export type PageUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<PageSectionRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageWhereInput = {
  AND?: InputMaybe<Array<PageWhereInput>>;
  NOT?: InputMaybe<Array<PageWhereInput>>;
  OR?: InputMaybe<Array<PageWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  sections?: InputMaybe<PageSectionManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type PageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type PasswordFilter = {
  isSet: Scalars['Boolean']['input'];
};

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type PayType = {
  __typename?: 'PayType';
  state: Scalars['String']['output'];
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeCustomerSessionClientSecret?: Maybe<Scalars['String']['output']>;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  stripePaymentIntentSecret?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fees?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  paymentError?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  stripeCaptured?: Maybe<Scalars['Boolean']['output']>;
  stripeIntentId?: Maybe<Scalars['String']['output']>;
  stripeTransferId?: Maybe<Scalars['String']['output']>;
  transferError?: Maybe<Scalars['Boolean']['output']>;
  trip?: Maybe<Trip>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type PaymentCreateInput = {
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  paymentError?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  stripeCaptured?: InputMaybe<Scalars['Boolean']['input']>;
  stripeIntentId?: InputMaybe<Scalars['String']['input']>;
  stripeTransferId?: InputMaybe<Scalars['String']['input']>;
  transferError?: InputMaybe<Scalars['Boolean']['input']>;
  trip?: InputMaybe<TripRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type PaymentManyRelationFilter = {
  every?: InputMaybe<PaymentWhereInput>;
  none?: InputMaybe<PaymentWhereInput>;
  some?: InputMaybe<PaymentWhereInput>;
};

export type PaymentOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  fees?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  paymentError?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  stripeCaptured?: InputMaybe<OrderDirection>;
  stripeIntentId?: InputMaybe<OrderDirection>;
  stripeTransferId?: InputMaybe<OrderDirection>;
  transferError?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type PaymentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
};

export type PaymentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  create?: InputMaybe<Array<PaymentCreateInput>>;
  disconnect?: InputMaybe<Array<PaymentWhereUniqueInput>>;
  set?: InputMaybe<Array<PaymentWhereUniqueInput>>;
};

export type PaymentRelateToOneForCreateInput = {
  connect?: InputMaybe<PaymentWhereUniqueInput>;
  create?: InputMaybe<PaymentCreateInput>;
};

export type PaymentRelateToOneForUpdateInput = {
  connect?: InputMaybe<PaymentWhereUniqueInput>;
  create?: InputMaybe<PaymentCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentUpdateArgs = {
  data: PaymentUpdateInput;
  where: PaymentWhereUniqueInput;
};

export type PaymentUpdateInput = {
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  paymentError?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  stripeCaptured?: InputMaybe<Scalars['Boolean']['input']>;
  stripeIntentId?: InputMaybe<Scalars['String']['input']>;
  stripeTransferId?: InputMaybe<Scalars['String']['input']>;
  transferError?: InputMaybe<Scalars['Boolean']['input']>;
  trip?: InputMaybe<TripRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type PaymentWhereInput = {
  AND?: InputMaybe<Array<PaymentWhereInput>>;
  NOT?: InputMaybe<Array<PaymentWhereInput>>;
  OR?: InputMaybe<Array<PaymentWhereInput>>;
  course?: InputMaybe<CourseWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  fees?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<IdFilter>;
  paymentError?: InputMaybe<BooleanFilter>;
  price?: InputMaybe<FloatNullableFilter>;
  state?: InputMaybe<StringNullableFilter>;
  stripeCaptured?: InputMaybe<BooleanFilter>;
  stripeIntentId?: InputMaybe<StringNullableFilter>;
  stripeTransferId?: InputMaybe<StringNullableFilter>;
  transferError?: InputMaybe<BooleanFilter>;
  trip?: InputMaybe<TripWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type PaymentWhereUniqueInput = {
  course?: InputMaybe<CourseWhereUniqueInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  trip?: InputMaybe<TripWhereUniqueInput>;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses?: Maybe<Array<Address>>;
  addressesCount?: Maybe<Scalars['Int']['output']>;
  /**
   * Métriques moyennes des courses terminées (state="paid") sur la fenêtre.
   * averageAcceptanceTimeSeconds = avg(startDatetimeUtc - createdAt).
   */
  adminCoursesMetrics: AdminCoursesMetrics;
  /**
   * Nombre de courses créées par jour sur les N derniers jours (default 30).
   * Compte TOUTES les courses (tous states) — vue volume d'activité.
   */
  adminCoursesTrend: Array<AdminTrendPoint>;
  /**
   * Agrégats par jour sur les N derniers jours (default 30). Pour chaque
   * jour : count (courses paid créées ce jour), revenue (sum price),
   * fees (sum fees), averagePrice (avg basket), averageDistance (avg en m).
   * Single query qui sert les 3 charts finance/perf (revenue trend, panier
   * moyen, distance moyenne) sans tirer 500 rows côté client.
   */
  adminDailyAggregates: Array<AdminDailyAggregate>;
  /**
   * Liste paginée des documents conducteurs (4 types confondus). Filtres
   * optionnels par type/state. Pendant côté serveur de l'ancien fetch
   * front qui chargeait 200 drivers et flatten 4 docs/driver — ne scalait
   * pas au-delà.
   */
  adminDocuments: AdminDocumentsPage;
  /**
   * Moyenne des notes drivers (User.driver.averageRate via Rating). Calcul
   * sur les ratings reçus par les drivers, pondéré par nombre de notes.
   */
  adminDriversAverageRating?: Maybe<Scalars['Float']['output']>;
  adminLog?: Maybe<AdminLog>;
  adminLogs?: Maybe<Array<AdminLog>>;
  adminLogsCount?: Maybe<Scalars['Int']['output']>;
  /**
   * Nombre de documents (DrivingLicense + Insurance + Certificate +
   * RegistrationDocument) en attente de validation (state ∈ pending/processing).
   */
  adminPendingDocumentsCount: Scalars['Int']['output'];
  /**
   * CA agrégé sur courses en state="paid" entre from..to (bornes incluses).
   * Si from/to absents → toutes les courses paid.
   */
  adminRevenueStats: AdminRevenueStats;
  /** Nombre de tickets créés par jour sur les N derniers jours (default 30). */
  adminTicketsTrend: Array<AdminTrendPoint>;
  /** Nombre d'inscriptions par jour sur les N derniers jours (default 30). */
  adminUsersTrend: Array<AdminTrendPoint>;
  affiliation?: Maybe<Affiliation>;
  affiliations?: Maybe<Array<Affiliation>>;
  affiliationsCount?: Maybe<Scalars['Int']['output']>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  certificate?: Maybe<Certificate>;
  certificates?: Maybe<Array<Certificate>>;
  certificatesCount?: Maybe<Scalars['Int']['output']>;
  course?: Maybe<Course>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']['output']>;
  driver?: Maybe<Driver>;
  driverSlot?: Maybe<DriverSlot>;
  driverSlots?: Maybe<Array<DriverSlot>>;
  driverSlotsCount?: Maybe<Scalars['Int']['output']>;
  drivers?: Maybe<Array<Driver>>;
  driversCount?: Maybe<Scalars['Int']['output']>;
  drivingLicense?: Maybe<DrivingLicense>;
  drivingLicenses?: Maybe<Array<DrivingLicense>>;
  drivingLicensesCount?: Maybe<Scalars['Int']['output']>;
  echo: Scalars['String']['output'];
  equipment?: Maybe<Equipment>;
  equipments?: Maybe<Array<Equipment>>;
  equipmentsCount?: Maybe<Scalars['Int']['output']>;
  file?: Maybe<File>;
  files?: Maybe<Array<File>>;
  filesCount?: Maybe<Scalars['Int']['output']>;
  getPendingCoursesCount: Scalars['Int']['output'];
  insurance?: Maybe<Insurance>;
  insurances?: Maybe<Array<Insurance>>;
  insurancesCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  location?: Maybe<Location>;
  locations?: Maybe<Array<Location>>;
  locationsCount?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Message>>;
  messagesCount?: Maybe<Scalars['Int']['output']>;
  node?: Maybe<Node>;
  nodes?: Maybe<Array<Node>>;
  nodesCount?: Maybe<Scalars['Int']['output']>;
  notification?: Maybe<Notification>;
  notifications?: Maybe<Array<Notification>>;
  notificationsCount?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Page>;
  pageSection?: Maybe<PageSection>;
  pageSections?: Maybe<Array<PageSection>>;
  pageSectionsCount?: Maybe<Scalars['Int']['output']>;
  pages?: Maybe<Array<Page>>;
  pagesCount?: Maybe<Scalars['Int']['output']>;
  payment?: Maybe<Payment>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Rating>;
  ratings?: Maybe<Array<Rating>>;
  ratingsCount?: Maybe<Scalars['Int']['output']>;
  registrationDocument?: Maybe<RegistrationDocument>;
  registrationDocuments?: Maybe<Array<RegistrationDocument>>;
  registrationDocumentsCount?: Maybe<Scalars['Int']['output']>;
  ticket?: Maybe<Ticket>;
  ticketMessage?: Maybe<TicketMessage>;
  ticketMessages?: Maybe<Array<TicketMessage>>;
  ticketMessagesCount?: Maybe<Scalars['Int']['output']>;
  ticketObject?: Maybe<TicketObject>;
  ticketObjects?: Maybe<Array<TicketObject>>;
  ticketObjectsCount?: Maybe<Scalars['Int']['output']>;
  tickets?: Maybe<Array<Ticket>>;
  ticketsCount?: Maybe<Scalars['Int']['output']>;
  trip?: Maybe<Trip>;
  tripPrice: TripDetailsType;
  trips?: Maybe<Array<Trip>>;
  tripsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  userCode?: Maybe<UserCode>;
  userCodes?: Maybe<Array<UserCode>>;
  userCodesCount?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
  vehicule?: Maybe<Vehicule>;
  vehicules?: Maybe<Array<Vehicule>>;
  vehiculesCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryAddressArgs = {
  where: AddressWhereUniqueInput;
};


export type QueryAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  orderBy?: Array<AddressOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AddressWhereInput;
};


export type QueryAddressesCountArgs = {
  where?: AddressWhereInput;
};


export type QueryAdminCoursesMetricsArgs = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryAdminCoursesTrendArgs = {
  days?: Scalars['Int']['input'];
};


export type QueryAdminDailyAggregatesArgs = {
  days?: Scalars['Int']['input'];
};


export type QueryAdminDocumentsArgs = {
  skip?: Scalars['Int']['input'];
  state?: InputMaybe<AdminDocumentState>;
  take?: Scalars['Int']['input'];
  type?: InputMaybe<AdminDocumentType>;
};


export type QueryAdminLogArgs = {
  where: AdminLogWhereUniqueInput;
};


export type QueryAdminLogsArgs = {
  cursor?: InputMaybe<AdminLogWhereUniqueInput>;
  orderBy?: Array<AdminLogOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AdminLogWhereInput;
};


export type QueryAdminLogsCountArgs = {
  where?: AdminLogWhereInput;
};


export type QueryAdminRevenueStatsArgs = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryAdminTicketsTrendArgs = {
  days?: Scalars['Int']['input'];
};


export type QueryAdminUsersTrendArgs = {
  days?: Scalars['Int']['input'];
};


export type QueryAffiliationArgs = {
  where: AffiliationWhereUniqueInput;
};


export type QueryAffiliationsArgs = {
  cursor?: InputMaybe<AffiliationWhereUniqueInput>;
  orderBy?: Array<AffiliationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AffiliationWhereInput;
};


export type QueryAffiliationsCountArgs = {
  where?: AffiliationWhereInput;
};


export type QueryCertificateArgs = {
  where: CertificateWhereUniqueInput;
};


export type QueryCertificatesArgs = {
  cursor?: InputMaybe<CertificateWhereUniqueInput>;
  orderBy?: Array<CertificateOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CertificateWhereInput;
};


export type QueryCertificatesCountArgs = {
  where?: CertificateWhereInput;
};


export type QueryCourseArgs = {
  where: CourseWhereUniqueInput;
};


export type QueryCoursesArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CourseWhereInput;
};


export type QueryCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type QueryDriverArgs = {
  where: DriverWhereUniqueInput;
};


export type QueryDriverSlotArgs = {
  where: DriverSlotWhereUniqueInput;
};


export type QueryDriverSlotsArgs = {
  cursor?: InputMaybe<DriverSlotWhereUniqueInput>;
  orderBy?: Array<DriverSlotOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DriverSlotWhereInput;
};


export type QueryDriverSlotsCountArgs = {
  where?: DriverSlotWhereInput;
};


export type QueryDriversArgs = {
  cursor?: InputMaybe<DriverWhereUniqueInput>;
  orderBy?: Array<DriverOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DriverWhereInput;
};


export type QueryDriversCountArgs = {
  where?: DriverWhereInput;
};


export type QueryDrivingLicenseArgs = {
  where: DrivingLicenseWhereUniqueInput;
};


export type QueryDrivingLicensesArgs = {
  cursor?: InputMaybe<DrivingLicenseWhereUniqueInput>;
  orderBy?: Array<DrivingLicenseOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: DrivingLicenseWhereInput;
};


export type QueryDrivingLicensesCountArgs = {
  where?: DrivingLicenseWhereInput;
};


export type QueryEchoArgs = {
  message: Scalars['String']['input'];
};


export type QueryEquipmentArgs = {
  where: EquipmentWhereUniqueInput;
};


export type QueryEquipmentsArgs = {
  cursor?: InputMaybe<EquipmentWhereUniqueInput>;
  orderBy?: Array<EquipmentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: EquipmentWhereInput;
};


export type QueryEquipmentsCountArgs = {
  where?: EquipmentWhereInput;
};


export type QueryFileArgs = {
  where: FileWhereUniqueInput;
};


export type QueryFilesArgs = {
  cursor?: InputMaybe<FileWhereUniqueInput>;
  orderBy?: Array<FileOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FileWhereInput;
};


export type QueryFilesCountArgs = {
  where?: FileWhereInput;
};


export type QueryGetPendingCoursesCountArgs = {
  minusHours?: Scalars['Int']['input'];
  mode: Scalars['String']['input'];
};


export type QueryInsuranceArgs = {
  where: InsuranceWhereUniqueInput;
};


export type QueryInsurancesArgs = {
  cursor?: InputMaybe<InsuranceWhereUniqueInput>;
  orderBy?: Array<InsuranceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InsuranceWhereInput;
};


export type QueryInsurancesCountArgs = {
  where?: InsuranceWhereInput;
};


export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryLocationsArgs = {
  cursor?: InputMaybe<LocationWhereUniqueInput>;
  orderBy?: Array<LocationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: LocationWhereInput;
};


export type QueryLocationsCountArgs = {
  where?: LocationWhereInput;
};


export type QueryMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type QueryMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  orderBy?: Array<MessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MessageWhereInput;
};


export type QueryMessagesCountArgs = {
  where?: MessageWhereInput;
};


export type QueryNodeArgs = {
  where: NodeWhereUniqueInput;
};


export type QueryNodesArgs = {
  cursor?: InputMaybe<NodeWhereUniqueInput>;
  orderBy?: Array<NodeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NodeWhereInput;
};


export type QueryNodesCountArgs = {
  where?: NodeWhereInput;
};


export type QueryNotificationArgs = {
  where: NotificationWhereUniqueInput;
};


export type QueryNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  orderBy?: Array<NotificationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: NotificationWhereInput;
};


export type QueryNotificationsCountArgs = {
  where?: NotificationWhereInput;
};


export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};


export type QueryPageSectionArgs = {
  where: PageSectionWhereUniqueInput;
};


export type QueryPageSectionsArgs = {
  cursor?: InputMaybe<PageSectionWhereUniqueInput>;
  orderBy?: Array<PageSectionOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PageSectionWhereInput;
};


export type QueryPageSectionsCountArgs = {
  where?: PageSectionWhereInput;
};


export type QueryPagesArgs = {
  cursor?: InputMaybe<PageWhereUniqueInput>;
  orderBy?: Array<PageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PageWhereInput;
};


export type QueryPagesCountArgs = {
  where?: PageWhereInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type QueryPaymentsCountArgs = {
  where?: PaymentWhereInput;
};


export type QueryRatingArgs = {
  where: RatingWhereUniqueInput;
};


export type QueryRatingsArgs = {
  cursor?: InputMaybe<RatingWhereUniqueInput>;
  orderBy?: Array<RatingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RatingWhereInput;
};


export type QueryRatingsCountArgs = {
  where?: RatingWhereInput;
};


export type QueryRegistrationDocumentArgs = {
  where: RegistrationDocumentWhereUniqueInput;
};


export type QueryRegistrationDocumentsArgs = {
  cursor?: InputMaybe<RegistrationDocumentWhereUniqueInput>;
  orderBy?: Array<RegistrationDocumentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RegistrationDocumentWhereInput;
};


export type QueryRegistrationDocumentsCountArgs = {
  where?: RegistrationDocumentWhereInput;
};


export type QueryTicketArgs = {
  where: TicketWhereUniqueInput;
};


export type QueryTicketMessageArgs = {
  where: TicketMessageWhereUniqueInput;
};


export type QueryTicketMessagesArgs = {
  cursor?: InputMaybe<TicketMessageWhereUniqueInput>;
  orderBy?: Array<TicketMessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TicketMessageWhereInput;
};


export type QueryTicketMessagesCountArgs = {
  where?: TicketMessageWhereInput;
};


export type QueryTicketObjectArgs = {
  where: TicketObjectWhereUniqueInput;
};


export type QueryTicketObjectsArgs = {
  cursor?: InputMaybe<TicketObjectWhereUniqueInput>;
  orderBy?: Array<TicketObjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TicketObjectWhereInput;
};


export type QueryTicketObjectsCountArgs = {
  where?: TicketObjectWhereInput;
};


export type QueryTicketsArgs = {
  cursor?: InputMaybe<TicketWhereUniqueInput>;
  orderBy?: Array<TicketOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TicketWhereInput;
};


export type QueryTicketsCountArgs = {
  where?: TicketWhereInput;
};


export type QueryTripArgs = {
  where: TripWhereUniqueInput;
};


export type QueryTripPriceArgs = {
  node1: NodeInput;
  node2: NodeInput;
  startDatetimeUtc: Scalars['DateTime']['input'];
};


export type QueryTripsArgs = {
  cursor?: InputMaybe<TripWhereUniqueInput>;
  orderBy?: Array<TripOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TripWhereInput;
};


export type QueryTripsCountArgs = {
  where?: TripWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserCodeArgs = {
  where: UserCodeWhereUniqueInput;
};


export type QueryUserCodesArgs = {
  cursor?: InputMaybe<UserCodeWhereUniqueInput>;
  orderBy?: Array<UserCodeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserCodeWhereInput;
};


export type QueryUserCodesCountArgs = {
  where?: UserCodeWhereInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};


export type QueryVehiculeArgs = {
  where: VehiculeWhereUniqueInput;
};


export type QueryVehiculesArgs = {
  cursor?: InputMaybe<VehiculeWhereUniqueInput>;
  orderBy?: Array<VehiculeOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: VehiculeWhereInput;
};


export type QueryVehiculesCountArgs = {
  where?: VehiculeWhereInput;
};

export type QueryMode =
  | 'default'
  | 'insensitive';

export type Rating = {
  __typename?: 'Rating';
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['Int']['output']>;
  ratedUser?: Maybe<User>;
  tags?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type RatingCreateInput = {
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['Int']['input']>;
  ratedUser?: InputMaybe<UserRelateToOneForCreateInput>;
  tags?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type RatingManyRelationFilter = {
  every?: InputMaybe<RatingWhereInput>;
  none?: InputMaybe<RatingWhereInput>;
  some?: InputMaybe<RatingWhereInput>;
};

export type RatingOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  message?: InputMaybe<OrderDirection>;
  note?: InputMaybe<OrderDirection>;
  tags?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type RatingRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  create?: InputMaybe<Array<RatingCreateInput>>;
};

export type RatingRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  create?: InputMaybe<Array<RatingCreateInput>>;
  disconnect?: InputMaybe<Array<RatingWhereUniqueInput>>;
  set?: InputMaybe<Array<RatingWhereUniqueInput>>;
};

export type RatingUpdateArgs = {
  data: RatingUpdateInput;
  where: RatingWhereUniqueInput;
};

export type RatingUpdateInput = {
  course?: InputMaybe<CourseRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['Int']['input']>;
  ratedUser?: InputMaybe<UserRelateToOneForUpdateInput>;
  tags?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type RatingWhereInput = {
  AND?: InputMaybe<Array<RatingWhereInput>>;
  NOT?: InputMaybe<Array<RatingWhereInput>>;
  OR?: InputMaybe<Array<RatingWhereInput>>;
  course?: InputMaybe<CourseWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  message?: InputMaybe<StringFilter>;
  note?: InputMaybe<IntFilter>;
  ratedUser?: InputMaybe<UserWhereInput>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type RatingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type RegistrationDocument = {
  __typename?: 'RegistrationDocument';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  picture?: Maybe<File>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type RegistrationDocumentCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<FileRelateToOneForCreateInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type RegistrationDocumentOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  expirationDatetimeUtc?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isExpired?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type RegistrationDocumentRelateToOneForCreateInput = {
  connect?: InputMaybe<RegistrationDocumentWhereUniqueInput>;
  create?: InputMaybe<RegistrationDocumentCreateInput>;
};

export type RegistrationDocumentRelateToOneForUpdateInput = {
  connect?: InputMaybe<RegistrationDocumentWhereUniqueInput>;
  create?: InputMaybe<RegistrationDocumentCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegistrationDocumentUpdateArgs = {
  data: RegistrationDocumentUpdateInput;
  where: RegistrationDocumentWhereUniqueInput;
};

export type RegistrationDocumentUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<FileRelateToOneForUpdateInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type RegistrationDocumentWhereInput = {
  AND?: InputMaybe<Array<RegistrationDocumentWhereInput>>;
  NOT?: InputMaybe<Array<RegistrationDocumentWhereInput>>;
  OR?: InputMaybe<Array<RegistrationDocumentWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  expirationDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  isExpired?: InputMaybe<BooleanFilter>;
  picture?: InputMaybe<FileWhereInput>;
  state?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type RegistrationDocumentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type ResetPasswordType = {
  __typename?: 'ResetPasswordType';
  _password?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SendUserCodeType = {
  __typename?: 'SendUserCodeType';
  _code?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  messages?: Maybe<Array<TicketMessage>>;
  messagesCount?: Maybe<Scalars['Int']['output']>;
  object?: Maybe<TicketObject>;
  solved?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};


export type TicketMessagesArgs = {
  cursor?: InputMaybe<TicketMessageWhereUniqueInput>;
  orderBy?: Array<TicketMessageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TicketMessageWhereInput;
};


export type TicketMessagesCountArgs = {
  where?: TicketMessageWhereInput;
};

export type TicketCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  messages?: InputMaybe<TicketMessageRelateToManyForCreateInput>;
  object?: InputMaybe<TicketObjectRelateToOneForCreateInput>;
  solved?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type TicketMessage = {
  __typename?: 'TicketMessage';
  attachment?: Maybe<File>;
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  ticket?: Maybe<Ticket>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketMessageCreateInput = {
  attachment?: InputMaybe<FileRelateToOneForCreateInput>;
  author?: InputMaybe<UserRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  ticket?: InputMaybe<TicketRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TicketMessageManyRelationFilter = {
  every?: InputMaybe<TicketMessageWhereInput>;
  none?: InputMaybe<TicketMessageWhereInput>;
  some?: InputMaybe<TicketMessageWhereInput>;
};

export type TicketMessageOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type TicketMessageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TicketMessageWhereUniqueInput>>;
  create?: InputMaybe<Array<TicketMessageCreateInput>>;
};

export type TicketMessageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TicketMessageWhereUniqueInput>>;
  create?: InputMaybe<Array<TicketMessageCreateInput>>;
  disconnect?: InputMaybe<Array<TicketMessageWhereUniqueInput>>;
  set?: InputMaybe<Array<TicketMessageWhereUniqueInput>>;
};

export type TicketMessageUpdateArgs = {
  data: TicketMessageUpdateInput;
  where: TicketMessageWhereUniqueInput;
};

export type TicketMessageUpdateInput = {
  attachment?: InputMaybe<FileRelateToOneForUpdateInput>;
  author?: InputMaybe<UserRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  ticket?: InputMaybe<TicketRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TicketMessageWhereInput = {
  AND?: InputMaybe<Array<TicketMessageWhereInput>>;
  NOT?: InputMaybe<Array<TicketMessageWhereInput>>;
  OR?: InputMaybe<Array<TicketMessageWhereInput>>;
  attachment?: InputMaybe<FileWhereInput>;
  author?: InputMaybe<UserWhereInput>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  ticket?: InputMaybe<TicketWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TicketMessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TicketObject = {
  __typename?: 'TicketObject';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  object?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketObjectCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  object?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TicketObjectOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  object?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type TicketObjectRelateToOneForCreateInput = {
  connect?: InputMaybe<TicketObjectWhereUniqueInput>;
  create?: InputMaybe<TicketObjectCreateInput>;
};

export type TicketObjectRelateToOneForUpdateInput = {
  connect?: InputMaybe<TicketObjectWhereUniqueInput>;
  create?: InputMaybe<TicketObjectCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TicketObjectUpdateArgs = {
  data: TicketObjectUpdateInput;
  where: TicketObjectWhereUniqueInput;
};

export type TicketObjectUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  object?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TicketObjectWhereInput = {
  AND?: InputMaybe<Array<TicketObjectWhereInput>>;
  NOT?: InputMaybe<Array<TicketObjectWhereInput>>;
  OR?: InputMaybe<Array<TicketObjectWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  object?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TicketObjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TicketOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  solved?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type TicketRelateToOneForCreateInput = {
  connect?: InputMaybe<TicketWhereUniqueInput>;
  create?: InputMaybe<TicketCreateInput>;
};

export type TicketRelateToOneForUpdateInput = {
  connect?: InputMaybe<TicketWhereUniqueInput>;
  create?: InputMaybe<TicketCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TicketUpdateArgs = {
  data: TicketUpdateInput;
  where: TicketWhereUniqueInput;
};

export type TicketUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  messages?: InputMaybe<TicketMessageRelateToManyForUpdateInput>;
  object?: InputMaybe<TicketObjectRelateToOneForUpdateInput>;
  solved?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type TicketWhereInput = {
  AND?: InputMaybe<Array<TicketWhereInput>>;
  NOT?: InputMaybe<Array<TicketWhereInput>>;
  OR?: InputMaybe<Array<TicketWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  messages?: InputMaybe<TicketMessageManyRelationFilter>;
  object?: InputMaybe<TicketObjectWhereInput>;
  solved?: InputMaybe<BooleanFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type TicketWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Trip = {
  __typename?: 'Trip';
  activeCourse?: Maybe<Course>;
  availableDrivers?: Maybe<Array<Maybe<Driver>>>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']['output']>;
  coursesHistory?: Maybe<Array<Maybe<Course>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  distance?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  endDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  fees?: Maybe<Scalars['Float']['output']>;
  fromNode?: Maybe<Node>;
  id: Scalars['ID']['output'];
  isInstant?: Maybe<Scalars['Boolean']['output']>;
  payment?: Maybe<Payment>;
  pendingCoursesCount?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  startDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  toNode?: Maybe<Node>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};


export type TripCoursesArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CourseWhereInput;
};


export type TripCoursesCountArgs = {
  where?: CourseWhereInput;
};

export type TripCreateInput = {
  courses?: InputMaybe<CourseRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  endDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  fromNode?: InputMaybe<NodeRelateToOneForCreateInput>;
  isInstant?: InputMaybe<Scalars['Boolean']['input']>;
  payment?: InputMaybe<PaymentRelateToOneForCreateInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  startDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  toNode?: InputMaybe<NodeRelateToOneForCreateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type TripDetailsType = {
  __typename?: 'TripDetailsType';
  distance?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  fees?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
};

export type TripManyRelationFilter = {
  every?: InputMaybe<TripWhereInput>;
  none?: InputMaybe<TripWhereInput>;
  some?: InputMaybe<TripWhereInput>;
};

export type TripOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  distance?: InputMaybe<OrderDirection>;
  duration?: InputMaybe<OrderDirection>;
  endDatetimeUtc?: InputMaybe<OrderDirection>;
  fees?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isInstant?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  startDatetimeUtc?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type TripRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TripWhereUniqueInput>>;
  create?: InputMaybe<Array<TripCreateInput>>;
};

export type TripRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TripWhereUniqueInput>>;
  create?: InputMaybe<Array<TripCreateInput>>;
  disconnect?: InputMaybe<Array<TripWhereUniqueInput>>;
  set?: InputMaybe<Array<TripWhereUniqueInput>>;
};

export type TripRelateToOneForCreateInput = {
  connect?: InputMaybe<TripWhereUniqueInput>;
  create?: InputMaybe<TripCreateInput>;
};

export type TripRelateToOneForUpdateInput = {
  connect?: InputMaybe<TripWhereUniqueInput>;
  create?: InputMaybe<TripCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TripUpdateArgs = {
  data: TripUpdateInput;
  where: TripWhereUniqueInput;
};

export type TripUpdateInput = {
  courses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  distance?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  endDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  fees?: InputMaybe<Scalars['Float']['input']>;
  fromNode?: InputMaybe<NodeRelateToOneForUpdateInput>;
  isInstant?: InputMaybe<Scalars['Boolean']['input']>;
  payment?: InputMaybe<PaymentRelateToOneForUpdateInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  startDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  toNode?: InputMaybe<NodeRelateToOneForUpdateInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type TripWhereInput = {
  AND?: InputMaybe<Array<TripWhereInput>>;
  NOT?: InputMaybe<Array<TripWhereInput>>;
  OR?: InputMaybe<Array<TripWhereInput>>;
  courses?: InputMaybe<CourseManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  distance?: InputMaybe<IntNullableFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  endDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  fees?: InputMaybe<FloatNullableFilter>;
  fromNode?: InputMaybe<NodeWhereInput>;
  id?: InputMaybe<IdFilter>;
  isInstant?: InputMaybe<BooleanFilter>;
  payment?: InputMaybe<PaymentWhereInput>;
  price?: InputMaybe<FloatNullableFilter>;
  startDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  toNode?: InputMaybe<NodeWhereInput>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type TripWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  payment?: InputMaybe<PaymentWhereUniqueInput>;
};

export type UpdatePasswordType = {
  __typename?: 'UpdatePasswordType';
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  addresses?: Maybe<Array<Address>>;
  addressesCount?: Maybe<Scalars['Int']['output']>;
  affiliatedWithMe?: Maybe<Array<Affiliation>>;
  affiliatedWithMeCount?: Maybe<Scalars['Int']['output']>;
  affiliation?: Maybe<Affiliation>;
  affiliationCode?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  anonymized?: Maybe<Scalars['Boolean']['output']>;
  avatar?: Maybe<File>;
  averageRate?: Maybe<Scalars['Float']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  bankAccount?: Maybe<UserBankAccountType>;
  birthdayDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  cards?: Maybe<Array<Maybe<UserCardType>>>;
  certificate?: Maybe<Certificate>;
  coursesCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  driver?: Maybe<Driver>;
  driverCourses?: Maybe<Array<Course>>;
  driverCoursesCount?: Maybe<Scalars['Int']['output']>;
  drivingLicense?: Maybe<DrivingLicense>;
  email?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  equipments?: Maybe<Array<Equipment>>;
  equipmentsCount?: Maybe<Scalars['Int']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  givenRatings?: Maybe<Array<Rating>>;
  givenRatingsCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  insurance?: Maybe<Insurance>;
  isAdmin?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  passengerCourses?: Maybe<Array<Course>>;
  passengerCoursesCount?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<PasswordState>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']['output']>;
  payouts?: Maybe<Array<Maybe<UserPayoutType>>>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  pushNotifications?: Maybe<Scalars['Boolean']['output']>;
  pushTokens?: Maybe<Scalars['JSON']['output']>;
  ratings?: Maybe<Array<Rating>>;
  ratingsCount?: Maybe<Scalars['Int']['output']>;
  registrationDocument?: Maybe<RegistrationDocument>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  trips?: Maybe<Array<Trip>>;
  tripsCount?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vehicule?: Maybe<Vehicule>;
};


export type UserAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  orderBy?: Array<AddressOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AddressWhereInput;
};


export type UserAddressesCountArgs = {
  where?: AddressWhereInput;
};


export type UserAffiliatedWithMeArgs = {
  cursor?: InputMaybe<AffiliationWhereUniqueInput>;
  orderBy?: Array<AffiliationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: AffiliationWhereInput;
};


export type UserAffiliatedWithMeCountArgs = {
  where?: AffiliationWhereInput;
};


export type UserDriverCoursesArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CourseWhereInput;
};


export type UserDriverCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type UserEquipmentsArgs = {
  cursor?: InputMaybe<EquipmentWhereUniqueInput>;
  orderBy?: Array<EquipmentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: EquipmentWhereInput;
};


export type UserEquipmentsCountArgs = {
  where?: EquipmentWhereInput;
};


export type UserGivenRatingsArgs = {
  cursor?: InputMaybe<RatingWhereUniqueInput>;
  orderBy?: Array<RatingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RatingWhereInput;
};


export type UserGivenRatingsCountArgs = {
  where?: RatingWhereInput;
};


export type UserPassengerCoursesArgs = {
  cursor?: InputMaybe<CourseWhereUniqueInput>;
  orderBy?: Array<CourseOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CourseWhereInput;
};


export type UserPassengerCoursesCountArgs = {
  where?: CourseWhereInput;
};


export type UserPaymentsArgs = {
  cursor?: InputMaybe<PaymentWhereUniqueInput>;
  orderBy?: Array<PaymentOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PaymentWhereInput;
};


export type UserPaymentsCountArgs = {
  where?: PaymentWhereInput;
};


export type UserRatingsArgs = {
  cursor?: InputMaybe<RatingWhereUniqueInput>;
  orderBy?: Array<RatingOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RatingWhereInput;
};


export type UserRatingsCountArgs = {
  where?: RatingWhereInput;
};


export type UserTripsArgs = {
  cursor?: InputMaybe<TripWhereUniqueInput>;
  orderBy?: Array<TripOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TripWhereInput;
};


export type UserTripsCountArgs = {
  where?: TripWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserBankAccountType = {
  __typename?: 'UserBankAccountType';
  bankName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last4?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
};

export type UserCardType = {
  __typename?: 'UserCardType';
  expiryMonth?: Maybe<Scalars['Int']['output']>;
  expiryYear?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last4?: Maybe<Scalars['String']['output']>;
};

export type UserCode = {
  __typename?: 'UserCode';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  validated?: Maybe<Scalars['Boolean']['output']>;
};

export type UserCodeCreateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  validated?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCodeOrderByInput = {
  code?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  validated?: InputMaybe<OrderDirection>;
};

export type UserCodeUpdateArgs = {
  data: UserCodeUpdateInput;
  where: UserCodeWhereUniqueInput;
};

export type UserCodeUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  validated?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCodeWhereInput = {
  AND?: InputMaybe<Array<UserCodeWhereInput>>;
  NOT?: InputMaybe<Array<UserCodeWhereInput>>;
  OR?: InputMaybe<Array<UserCodeWhereInput>>;
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  validated?: InputMaybe<BooleanFilter>;
};

export type UserCodeWhereUniqueInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type UserCreateInput = {
  addresses?: InputMaybe<AddressRelateToManyForCreateInput>;
  affiliatedWithMe?: InputMaybe<AffiliationRelateToManyForCreateInput>;
  affiliation?: InputMaybe<AffiliationRelateToOneForCreateInput>;
  affiliationCode?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  anonymized?: InputMaybe<Scalars['Boolean']['input']>;
  avatar?: InputMaybe<FileRelateToOneForCreateInput>;
  birthdayDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  certificate?: InputMaybe<CertificateRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deletionReason?: InputMaybe<Scalars['String']['input']>;
  driver?: InputMaybe<DriverRelateToOneForCreateInput>;
  driverCourses?: InputMaybe<CourseRelateToManyForCreateInput>;
  drivingLicense?: InputMaybe<DrivingLicenseRelateToOneForCreateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  equipments?: InputMaybe<EquipmentRelateToManyForCreateInput>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  givenRatings?: InputMaybe<RatingRelateToManyForCreateInput>;
  insurance?: InputMaybe<InsuranceRelateToOneForCreateInput>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  passengerCourses?: InputMaybe<CourseRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForCreateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pushNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  pushTokens?: InputMaybe<Scalars['JSON']['input']>;
  ratings?: InputMaybe<RatingRelateToManyForCreateInput>;
  registrationDocument?: InputMaybe<RegistrationDocumentRelateToOneForCreateInput>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  trips?: InputMaybe<TripRelateToManyForCreateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  vehicule?: InputMaybe<VehiculeRelateToOneForCreateInput>;
};

export type UserOrderByInput = {
  affiliationCode?: InputMaybe<OrderDirection>;
  age?: InputMaybe<OrderDirection>;
  anonymized?: InputMaybe<OrderDirection>;
  birthdayDatetimeUtc?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  deletedAt?: InputMaybe<OrderDirection>;
  deletionReason?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  enabled?: InputMaybe<OrderDirection>;
  firstname?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAdmin?: InputMaybe<OrderDirection>;
  lastname?: InputMaybe<OrderDirection>;
  phoneNumber?: InputMaybe<OrderDirection>;
  pushNotifications?: InputMaybe<OrderDirection>;
  stripeCustomerId?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type UserPayoutType = {
  __typename?: 'UserPayoutType';
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  addresses?: InputMaybe<AddressRelateToManyForUpdateInput>;
  affiliatedWithMe?: InputMaybe<AffiliationRelateToManyForUpdateInput>;
  affiliation?: InputMaybe<AffiliationRelateToOneForUpdateInput>;
  affiliationCode?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  anonymized?: InputMaybe<Scalars['Boolean']['input']>;
  avatar?: InputMaybe<FileRelateToOneForUpdateInput>;
  birthdayDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  certificate?: InputMaybe<CertificateRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  deletionReason?: InputMaybe<Scalars['String']['input']>;
  driver?: InputMaybe<DriverRelateToOneForUpdateInput>;
  driverCourses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  drivingLicense?: InputMaybe<DrivingLicenseRelateToOneForUpdateInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  equipments?: InputMaybe<EquipmentRelateToManyForUpdateInput>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  givenRatings?: InputMaybe<RatingRelateToManyForUpdateInput>;
  insurance?: InputMaybe<InsuranceRelateToOneForUpdateInput>;
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  passengerCourses?: InputMaybe<CourseRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<PaymentRelateToManyForUpdateInput>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  pushNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  pushTokens?: InputMaybe<Scalars['JSON']['input']>;
  ratings?: InputMaybe<RatingRelateToManyForUpdateInput>;
  registrationDocument?: InputMaybe<RegistrationDocumentRelateToOneForUpdateInput>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  trips?: InputMaybe<TripRelateToManyForUpdateInput>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  vehicule?: InputMaybe<VehiculeRelateToOneForUpdateInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  addresses?: InputMaybe<AddressManyRelationFilter>;
  affiliatedWithMe?: InputMaybe<AffiliationManyRelationFilter>;
  affiliation?: InputMaybe<AffiliationWhereInput>;
  affiliationCode?: InputMaybe<StringFilter>;
  age?: InputMaybe<IntNullableFilter>;
  anonymized?: InputMaybe<BooleanFilter>;
  avatar?: InputMaybe<FileWhereInput>;
  birthdayDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  certificate?: InputMaybe<CertificateWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  deletionReason?: InputMaybe<StringFilter>;
  driver?: InputMaybe<DriverWhereInput>;
  driverCourses?: InputMaybe<CourseManyRelationFilter>;
  drivingLicense?: InputMaybe<DrivingLicenseWhereInput>;
  email?: InputMaybe<StringNullableFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  equipments?: InputMaybe<EquipmentManyRelationFilter>;
  firstname?: InputMaybe<StringFilter>;
  givenRatings?: InputMaybe<RatingManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  insurance?: InputMaybe<InsuranceWhereInput>;
  isAdmin?: InputMaybe<BooleanFilter>;
  lastname?: InputMaybe<StringFilter>;
  passengerCourses?: InputMaybe<CourseManyRelationFilter>;
  password?: InputMaybe<PasswordFilter>;
  payments?: InputMaybe<PaymentManyRelationFilter>;
  phoneNumber?: InputMaybe<StringFilter>;
  pushNotifications?: InputMaybe<BooleanFilter>;
  ratings?: InputMaybe<RatingManyRelationFilter>;
  registrationDocument?: InputMaybe<RegistrationDocumentWhereInput>;
  stripeCustomerId?: InputMaybe<StringFilter>;
  trips?: InputMaybe<TripManyRelationFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  vehicule?: InputMaybe<VehiculeWhereInput>;
};

export type UserWhereUniqueInput = {
  affiliation?: InputMaybe<AffiliationWhereUniqueInput>;
  certificate?: InputMaybe<CertificateWhereUniqueInput>;
  driver?: InputMaybe<DriverWhereUniqueInput>;
  drivingLicense?: InputMaybe<DrivingLicenseWhereUniqueInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  insurance?: InputMaybe<InsuranceWhereUniqueInput>;
  registrationDocument?: InputMaybe<RegistrationDocumentWhereUniqueInput>;
  vehicule?: InputMaybe<VehiculeWhereUniqueInput>;
};

export type Vehicule = {
  __typename?: 'Vehicule';
  brand?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstYear?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  model?: Maybe<Scalars['String']['output']>;
  registration?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type VehiculeCreateInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstYear?: InputMaybe<Scalars['DateTime']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registration?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type VehiculeOrderByInput = {
  brand?: InputMaybe<OrderDirection>;
  color?: InputMaybe<OrderDirection>;
  country?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  firstYear?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  model?: InputMaybe<OrderDirection>;
  registration?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type VehiculeRelateToOneForCreateInput = {
  connect?: InputMaybe<VehiculeWhereUniqueInput>;
  create?: InputMaybe<VehiculeCreateInput>;
};

export type VehiculeRelateToOneForUpdateInput = {
  connect?: InputMaybe<VehiculeWhereUniqueInput>;
  create?: InputMaybe<VehiculeCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VehiculeUpdateArgs = {
  data: VehiculeUpdateInput;
  where: VehiculeWhereUniqueInput;
};

export type VehiculeUpdateInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstYear?: InputMaybe<Scalars['DateTime']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registration?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type VehiculeWhereInput = {
  AND?: InputMaybe<Array<VehiculeWhereInput>>;
  NOT?: InputMaybe<Array<VehiculeWhereInput>>;
  OR?: InputMaybe<Array<VehiculeWhereInput>>;
  brand?: InputMaybe<StringFilter>;
  color?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  firstYear?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  model?: InputMaybe<StringFilter>;
  registration?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type VehiculeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhereUniqueInput>;
};

export type AuthenticateUserWithPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthenticateUserWithPasswordMutation = { __typename?: 'Mutation', authenticateUserWithPassword?:
    | { __typename?: 'UserAuthenticationWithPasswordFailure', message: string }
    | { __typename?: 'UserAuthenticationWithPasswordSuccess', sessionToken: string, item: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, isAdmin?: boolean | null } }
   | null };

export type GetAuthenticatedItemQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthenticatedItemQuery = { __typename?: 'Query', authenticatedItem?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, isAdmin?: boolean | null } | null };

export type EndSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type EndSessionMutation = { __typename?: 'Mutation', endSession: boolean };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordType', success: boolean } };

export type GetUsersQueryVariables = Exact<{
  where: UserWhereInput;
  orderBy: Array<UserOrderByInput> | UserOrderByInput;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
}>;


export type GetUsersQuery = { __typename?: 'Query', usersCount?: number | null, users?: Array<{ __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, type?: string | null, isAdmin?: boolean | null, enabled?: boolean | null, phoneNumber?: string | null, createdAt?: string | null, averageRate?: number | null, ratingsCount?: number | null, drivingLicense?: { __typename?: 'DrivingLicense', id: string, state?: string | null } | null, insurance?: { __typename?: 'Insurance', id: string, state?: string | null } | null, registrationDocument?: { __typename?: 'RegistrationDocument', id: string, state?: string | null } | null, certificate?: { __typename?: 'Certificate', id: string, state?: string | null } | null }> | null };

export type GetTicketsQueryVariables = Exact<{
  where: TicketWhereInput;
  orderBy: Array<TicketOrderByInput> | TicketOrderByInput;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
}>;


export type GetTicketsQuery = { __typename?: 'Query', ticketsCount?: number | null, tickets?: Array<{ __typename?: 'Ticket', id: string, solved?: boolean | null, description?: string | null, createdAt?: string | null, updatedAt?: string | null, object?: { __typename?: 'TicketObject', id: string, object?: string | null } | null, user?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null } | null }> | null };

export type GetTicketsCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsCountsQuery = { __typename?: 'Query', pending?: number | null, solved?: number | null };

export type GetTicketQueryVariables = Exact<{
  where: TicketWhereUniqueInput;
}>;


export type GetTicketQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', id: string, solved?: boolean | null, description?: string | null, createdAt?: string | null, updatedAt?: string | null, object?: { __typename?: 'TicketObject', id: string, object?: string | null } | null, user?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, phoneNumber?: string | null } | null, messages?: Array<{ __typename?: 'TicketMessage', id: string, content?: string | null, createdAt?: string | null, author?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email?: string | null, isAdmin?: boolean | null } | null, attachment?: { __typename?: 'File', id: string, uri?: string | null, mimetype?: string | null } | null }> | null } | null };

export type UpdateTicketMutationVariables = Exact<{
  where: TicketWhereUniqueInput;
  data: TicketUpdateInput;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket?: { __typename?: 'Ticket', id: string, solved?: boolean | null } | null };

export type CreateTicketMessageMutationVariables = Exact<{
  data: TicketMessageCreateInput;
}>;


export type CreateTicketMessageMutation = { __typename?: 'Mutation', createTicketMessage?: { __typename?: 'TicketMessage', id: string, content?: string | null, createdAt?: string | null, author?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email?: string | null, isAdmin?: boolean | null } | null, attachment?: { __typename?: 'File', id: string, uri?: string | null, mimetype?: string | null } | null } | null };

export type GetUsersCountsQueryVariables = Exact<{
  todayWhere: UserWhereInput;
  weekWhere: UserWhereInput;
  monthWhere: UserWhereInput;
}>;


export type GetUsersCountsQuery = { __typename?: 'Query', total?: number | null, today?: number | null, week?: number | null, month?: number | null, passengers?: number | null, drivers?: number | null, active?: number | null, blocked?: number | null };

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, type?: string | null, isAdmin?: boolean | null, enabled?: boolean | null, anonymized?: boolean | null, phoneNumber?: string | null, birthdayDatetimeUtc?: string | null, affiliationCode?: string | null, age?: number | null, averageRate?: number | null, coursesCount?: number | null, stripeCustomerId?: string | null, pushNotifications?: boolean | null, createdAt?: string | null, updatedAt?: string | null, ratingsCount?: number | null, avatar?: { __typename?: 'File', id: string, uri?: string | null } | null, drivingLicense?: { __typename?: 'DrivingLicense', id: string, state?: string | null, obtentionYear?: number | null, createdAt?: string | null, updatedAt?: string | null, picture?: { __typename?: 'File', id: string, uri?: string | null } | null } | null, insurance?: { __typename?: 'Insurance', id: string, state?: string | null, expirationDatetimeUtc?: string | null, isExpired?: boolean | null, createdAt?: string | null, updatedAt?: string | null, picture?: { __typename?: 'File', id: string, uri?: string | null } | null } | null, registrationDocument?: { __typename?: 'RegistrationDocument', id: string, state?: string | null, createdAt?: string | null, updatedAt?: string | null, picture?: { __typename?: 'File', id: string, uri?: string | null } | null } | null, certificate?: { __typename?: 'Certificate', id: string, state?: string | null, expirationDatetime?: string | null, registrationDatetime?: string | null, createdAt?: string | null, updatedAt?: string | null, picture?: { __typename?: 'File', id: string, uri?: string | null } | null } | null, vehicule?: { __typename?: 'Vehicule', id: string, brand?: string | null, model?: string | null, color?: string | null, registration?: string | null, country?: string | null, firstYear?: string | null } | null, ratings?: Array<{ __typename?: 'Rating', id: string, note?: number | null, message?: string | null, tags?: string | null, createdAt?: string | null, user?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null } | null }> | null } | null };

export type GetCoursesCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesCountsQuery = { __typename?: 'Query', inProgress?: number | null, rejected?: number | null, completed?: number | null, cancelled?: number | null };

export type GetCoursesCountsByPeriodQueryVariables = Exact<{
  todayWhere: CourseWhereInput;
  weekWhere: CourseWhereInput;
  monthWhere: CourseWhereInput;
  yearWhere: CourseWhereInput;
}>;


export type GetCoursesCountsByPeriodQuery = { __typename?: 'Query', total?: number | null, today?: number | null, week?: number | null, month?: number | null, year?: number | null };

export type UpdateUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, enabled?: boolean | null } | null };

export type UpdateDrivingLicenseMutationVariables = Exact<{
  where: DrivingLicenseWhereUniqueInput;
  data: DrivingLicenseUpdateInput;
}>;


export type UpdateDrivingLicenseMutation = { __typename?: 'Mutation', updateDrivingLicense?: { __typename?: 'DrivingLicense', id: string, state?: string | null } | null };

export type UpdateInsuranceMutationVariables = Exact<{
  where: InsuranceWhereUniqueInput;
  data: InsuranceUpdateInput;
}>;


export type UpdateInsuranceMutation = { __typename?: 'Mutation', updateInsurance?: { __typename?: 'Insurance', id: string, state?: string | null } | null };

export type UpdateRegistrationDocumentMutationVariables = Exact<{
  where: RegistrationDocumentWhereUniqueInput;
  data: RegistrationDocumentUpdateInput;
}>;


export type UpdateRegistrationDocumentMutation = { __typename?: 'Mutation', updateRegistrationDocument?: { __typename?: 'RegistrationDocument', id: string, state?: string | null } | null };

export type UpdateCertificateMutationVariables = Exact<{
  where: CertificateWhereUniqueInput;
  data: CertificateUpdateInput;
}>;


export type UpdateCertificateMutation = { __typename?: 'Mutation', updateCertificate?: { __typename?: 'Certificate', id: string, state?: string | null } | null };

export type GetAdminRevenueStatsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetAdminRevenueStatsQuery = { __typename?: 'Query', adminRevenueStats: { __typename?: 'AdminRevenueStats', revenue: number, fees: number, basket: number, count: number } };

export type GetAdminCoursesMetricsQueryVariables = Exact<{
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type GetAdminCoursesMetricsQuery = { __typename?: 'Query', adminCoursesMetrics: { __typename?: 'AdminCoursesMetrics', averageDistance?: number | null, averageDuration?: number | null, averagePrice?: number | null, averageAcceptanceTimeSeconds?: number | null, count: number } };

export type GetAdminCoursesTrendQueryVariables = Exact<{
  days: Scalars['Int']['input'];
}>;


export type GetAdminCoursesTrendQuery = { __typename?: 'Query', adminCoursesTrend: Array<{ __typename?: 'AdminTrendPoint', date: string, count: number }> };

export type GetAdminUsersTrendQueryVariables = Exact<{
  days: Scalars['Int']['input'];
}>;


export type GetAdminUsersTrendQuery = { __typename?: 'Query', adminUsersTrend: Array<{ __typename?: 'AdminTrendPoint', date: string, count: number }> };

export type GetAdminTicketsTrendQueryVariables = Exact<{
  days: Scalars['Int']['input'];
}>;


export type GetAdminTicketsTrendQuery = { __typename?: 'Query', adminTicketsTrend: Array<{ __typename?: 'AdminTrendPoint', date: string, count: number }> };

export type GetAdminDriversAverageRatingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminDriversAverageRatingQuery = { __typename?: 'Query', adminDriversAverageRating?: number | null };

export type GetAdminPendingDocumentsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminPendingDocumentsCountQuery = { __typename?: 'Query', adminPendingDocumentsCount: number };

export type GetAdminDocumentsQueryVariables = Exact<{
  type?: InputMaybe<AdminDocumentType>;
  state?: InputMaybe<AdminDocumentState>;
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type GetAdminDocumentsQuery = { __typename?: 'Query', adminDocuments: { __typename?: 'AdminDocumentsPage', total: number, items: Array<{ __typename?: 'AdminDocument', id: string, type: AdminDocumentType, state?: string | null, createdAt?: string | null, updatedAt?: string | null, user?: { __typename?: 'AdminDocumentUser', id: string, firstname?: string | null, lastname?: string | null, email?: string | null } | null, picture?: { __typename?: 'AdminDocumentPicture', id: string, uri?: string | null } | null }> } };

export type GetAdminDailyAggregatesQueryVariables = Exact<{
  days: Scalars['Int']['input'];
}>;


export type GetAdminDailyAggregatesQuery = { __typename?: 'Query', adminDailyAggregates: Array<{ __typename?: 'AdminDailyAggregate', date: string, count: number, revenue: number, fees: number, averagePrice?: number | null, averageDistance?: number | null }> };



export const AuthenticateUserWithPasswordDocument = `
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
    `;

export const useAuthenticateUserWithPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AuthenticateUserWithPasswordMutation, TError, AuthenticateUserWithPasswordMutationVariables, TContext>) => {
    
    return useMutation<AuthenticateUserWithPasswordMutation, TError, AuthenticateUserWithPasswordMutationVariables, TContext>(
      {
    mutationKey: ['AuthenticateUserWithPassword'],
    mutationFn: (variables?: AuthenticateUserWithPasswordMutationVariables) => graphqlClient<AuthenticateUserWithPasswordMutation, AuthenticateUserWithPasswordMutationVariables>(AuthenticateUserWithPasswordDocument, variables)(),
    ...options
  }
    )};


useAuthenticateUserWithPasswordMutation.fetcher = (variables: AuthenticateUserWithPasswordMutationVariables, options?: RequestInit['headers']) => graphqlClient<AuthenticateUserWithPasswordMutation, AuthenticateUserWithPasswordMutationVariables>(AuthenticateUserWithPasswordDocument, variables, options);

export const GetAuthenticatedItemDocument = `
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
    `;

export const useGetAuthenticatedItemQuery = <
      TData = GetAuthenticatedItemQuery,
      TError = unknown
    >(
      variables?: GetAuthenticatedItemQueryVariables,
      options?: Omit<UseQueryOptions<GetAuthenticatedItemQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAuthenticatedItemQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAuthenticatedItemQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAuthenticatedItem'] : ['GetAuthenticatedItem', variables],
    queryFn: graphqlClient<GetAuthenticatedItemQuery, GetAuthenticatedItemQueryVariables>(GetAuthenticatedItemDocument, variables),
    ...options
  }
    )};

useGetAuthenticatedItemQuery.getKey = (variables?: GetAuthenticatedItemQueryVariables) => variables === undefined ? ['GetAuthenticatedItem'] : ['GetAuthenticatedItem', variables];


useGetAuthenticatedItemQuery.fetcher = (variables?: GetAuthenticatedItemQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAuthenticatedItemQuery, GetAuthenticatedItemQueryVariables>(GetAuthenticatedItemDocument, variables, options);

export const EndSessionDocument = `
    mutation EndSession {
  endSession
}
    `;

export const useEndSessionMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<EndSessionMutation, TError, EndSessionMutationVariables, TContext>) => {
    
    return useMutation<EndSessionMutation, TError, EndSessionMutationVariables, TContext>(
      {
    mutationKey: ['EndSession'],
    mutationFn: (variables?: EndSessionMutationVariables) => graphqlClient<EndSessionMutation, EndSessionMutationVariables>(EndSessionDocument, variables)(),
    ...options
  }
    )};


useEndSessionMutation.fetcher = (variables?: EndSessionMutationVariables, options?: RequestInit['headers']) => graphqlClient<EndSessionMutation, EndSessionMutationVariables>(EndSessionDocument, variables, options);

export const ResetPasswordDocument = `
    mutation ResetPassword($email: String!) {
  resetPassword(email: $email) {
    success
  }
}
    `;

export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>) => {
    
    return useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      {
    mutationKey: ['ResetPassword'],
    mutationFn: (variables?: ResetPasswordMutationVariables) => graphqlClient<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables)(),
    ...options
  }
    )};


useResetPasswordMutation.fetcher = (variables: ResetPasswordMutationVariables, options?: RequestInit['headers']) => graphqlClient<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables, options);

export const GetUsersDocument = `
    query GetUsers($where: UserWhereInput!, $orderBy: [UserOrderByInput!]!, $take: Int, $skip: Int!) {
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
    `;

export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      variables: GetUsersQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUsersQuery, TError, TData>(
      {
    queryKey: ['GetUsers', variables],
    queryFn: graphqlClient<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables),
    ...options
  }
    )};

useGetUsersQuery.getKey = (variables: GetUsersQueryVariables) => ['GetUsers', variables];


useGetUsersQuery.fetcher = (variables: GetUsersQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables, options);

export const GetTicketsDocument = `
    query GetTickets($where: TicketWhereInput!, $orderBy: [TicketOrderByInput!]!, $take: Int, $skip: Int!) {
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
    `;

export const useGetTicketsQuery = <
      TData = GetTicketsQuery,
      TError = unknown
    >(
      variables: GetTicketsQueryVariables,
      options?: Omit<UseQueryOptions<GetTicketsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTicketsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTicketsQuery, TError, TData>(
      {
    queryKey: ['GetTickets', variables],
    queryFn: graphqlClient<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, variables),
    ...options
  }
    )};

useGetTicketsQuery.getKey = (variables: GetTicketsQueryVariables) => ['GetTickets', variables];


useGetTicketsQuery.fetcher = (variables: GetTicketsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetTicketsQuery, GetTicketsQueryVariables>(GetTicketsDocument, variables, options);

export const GetTicketsCountsDocument = `
    query GetTicketsCounts {
  pending: ticketsCount(where: {solved: {equals: false}})
  solved: ticketsCount(where: {solved: {equals: true}})
}
    `;

export const useGetTicketsCountsQuery = <
      TData = GetTicketsCountsQuery,
      TError = unknown
    >(
      variables?: GetTicketsCountsQueryVariables,
      options?: Omit<UseQueryOptions<GetTicketsCountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTicketsCountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTicketsCountsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTicketsCounts'] : ['GetTicketsCounts', variables],
    queryFn: graphqlClient<GetTicketsCountsQuery, GetTicketsCountsQueryVariables>(GetTicketsCountsDocument, variables),
    ...options
  }
    )};

useGetTicketsCountsQuery.getKey = (variables?: GetTicketsCountsQueryVariables) => variables === undefined ? ['GetTicketsCounts'] : ['GetTicketsCounts', variables];


useGetTicketsCountsQuery.fetcher = (variables?: GetTicketsCountsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetTicketsCountsQuery, GetTicketsCountsQueryVariables>(GetTicketsCountsDocument, variables, options);

export const GetTicketDocument = `
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
    messages(orderBy: [{createdAt: asc}]) {
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
    `;

export const useGetTicketQuery = <
      TData = GetTicketQuery,
      TError = unknown
    >(
      variables: GetTicketQueryVariables,
      options?: Omit<UseQueryOptions<GetTicketQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTicketQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTicketQuery, TError, TData>(
      {
    queryKey: ['GetTicket', variables],
    queryFn: graphqlClient<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, variables),
    ...options
  }
    )};

useGetTicketQuery.getKey = (variables: GetTicketQueryVariables) => ['GetTicket', variables];


useGetTicketQuery.fetcher = (variables: GetTicketQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, variables, options);

export const UpdateTicketDocument = `
    mutation UpdateTicket($where: TicketWhereUniqueInput!, $data: TicketUpdateInput!) {
  updateTicket(where: $where, data: $data) {
    id
    solved
  }
}
    `;

export const useUpdateTicketMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTicketMutation, TError, UpdateTicketMutationVariables, TContext>) => {
    
    return useMutation<UpdateTicketMutation, TError, UpdateTicketMutationVariables, TContext>(
      {
    mutationKey: ['UpdateTicket'],
    mutationFn: (variables?: UpdateTicketMutationVariables) => graphqlClient<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, variables)(),
    ...options
  }
    )};


useUpdateTicketMutation.fetcher = (variables: UpdateTicketMutationVariables, options?: RequestInit['headers']) => graphqlClient<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, variables, options);

export const CreateTicketMessageDocument = `
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
    `;

export const useCreateTicketMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTicketMessageMutation, TError, CreateTicketMessageMutationVariables, TContext>) => {
    
    return useMutation<CreateTicketMessageMutation, TError, CreateTicketMessageMutationVariables, TContext>(
      {
    mutationKey: ['CreateTicketMessage'],
    mutationFn: (variables?: CreateTicketMessageMutationVariables) => graphqlClient<CreateTicketMessageMutation, CreateTicketMessageMutationVariables>(CreateTicketMessageDocument, variables)(),
    ...options
  }
    )};


useCreateTicketMessageMutation.fetcher = (variables: CreateTicketMessageMutationVariables, options?: RequestInit['headers']) => graphqlClient<CreateTicketMessageMutation, CreateTicketMessageMutationVariables>(CreateTicketMessageDocument, variables, options);

export const GetUsersCountsDocument = `
    query GetUsersCounts($todayWhere: UserWhereInput!, $weekWhere: UserWhereInput!, $monthWhere: UserWhereInput!) {
  total: usersCount(where: {isAdmin: {equals: false}})
  today: usersCount(where: $todayWhere)
  week: usersCount(where: $weekWhere)
  month: usersCount(where: $monthWhere)
  passengers: usersCount(
    where: {type: {equals: "passenger"}, isAdmin: {equals: false}}
  )
  drivers: usersCount(where: {type: {equals: "driver"}, isAdmin: {equals: false}})
  active: usersCount(where: {enabled: {equals: true}, isAdmin: {equals: false}})
  blocked: usersCount(where: {enabled: {equals: false}, isAdmin: {equals: false}})
}
    `;

export const useGetUsersCountsQuery = <
      TData = GetUsersCountsQuery,
      TError = unknown
    >(
      variables: GetUsersCountsQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersCountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersCountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUsersCountsQuery, TError, TData>(
      {
    queryKey: ['GetUsersCounts', variables],
    queryFn: graphqlClient<GetUsersCountsQuery, GetUsersCountsQueryVariables>(GetUsersCountsDocument, variables),
    ...options
  }
    )};

useGetUsersCountsQuery.getKey = (variables: GetUsersCountsQueryVariables) => ['GetUsersCounts', variables];


useGetUsersCountsQuery.fetcher = (variables: GetUsersCountsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetUsersCountsQuery, GetUsersCountsQueryVariables>(GetUsersCountsDocument, variables, options);

export const GetUserDocument = `
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
    ratings(orderBy: [{createdAt: desc}], take: 10) {
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
    `;

export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      variables: GetUserQueryVariables,
      options?: Omit<UseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserQuery, TError, TData>(
      {
    queryKey: ['GetUser', variables],
    queryFn: graphqlClient<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables),
    ...options
  }
    )};

useGetUserQuery.getKey = (variables: GetUserQueryVariables) => ['GetUser', variables];


useGetUserQuery.fetcher = (variables: GetUserQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);

export const GetCoursesCountsDocument = `
    query GetCoursesCounts {
  inProgress: coursesCount(where: {state: {equals: "accepted"}})
  rejected: coursesCount(where: {state: {equals: "rejected"}})
  completed: coursesCount(where: {state: {equals: "paid"}})
  cancelled: coursesCount(where: {state: {equals: "cancelled"}})
}
    `;

export const useGetCoursesCountsQuery = <
      TData = GetCoursesCountsQuery,
      TError = unknown
    >(
      variables?: GetCoursesCountsQueryVariables,
      options?: Omit<UseQueryOptions<GetCoursesCountsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCoursesCountsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCoursesCountsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCoursesCounts'] : ['GetCoursesCounts', variables],
    queryFn: graphqlClient<GetCoursesCountsQuery, GetCoursesCountsQueryVariables>(GetCoursesCountsDocument, variables),
    ...options
  }
    )};

useGetCoursesCountsQuery.getKey = (variables?: GetCoursesCountsQueryVariables) => variables === undefined ? ['GetCoursesCounts'] : ['GetCoursesCounts', variables];


useGetCoursesCountsQuery.fetcher = (variables?: GetCoursesCountsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetCoursesCountsQuery, GetCoursesCountsQueryVariables>(GetCoursesCountsDocument, variables, options);

export const GetCoursesCountsByPeriodDocument = `
    query GetCoursesCountsByPeriod($todayWhere: CourseWhereInput!, $weekWhere: CourseWhereInput!, $monthWhere: CourseWhereInput!, $yearWhere: CourseWhereInput!) {
  total: coursesCount
  today: coursesCount(where: $todayWhere)
  week: coursesCount(where: $weekWhere)
  month: coursesCount(where: $monthWhere)
  year: coursesCount(where: $yearWhere)
}
    `;

export const useGetCoursesCountsByPeriodQuery = <
      TData = GetCoursesCountsByPeriodQuery,
      TError = unknown
    >(
      variables: GetCoursesCountsByPeriodQueryVariables,
      options?: Omit<UseQueryOptions<GetCoursesCountsByPeriodQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCoursesCountsByPeriodQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCoursesCountsByPeriodQuery, TError, TData>(
      {
    queryKey: ['GetCoursesCountsByPeriod', variables],
    queryFn: graphqlClient<GetCoursesCountsByPeriodQuery, GetCoursesCountsByPeriodQueryVariables>(GetCoursesCountsByPeriodDocument, variables),
    ...options
  }
    )};

useGetCoursesCountsByPeriodQuery.getKey = (variables: GetCoursesCountsByPeriodQueryVariables) => ['GetCoursesCountsByPeriod', variables];


useGetCoursesCountsByPeriodQuery.fetcher = (variables: GetCoursesCountsByPeriodQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetCoursesCountsByPeriodQuery, GetCoursesCountsByPeriodQueryVariables>(GetCoursesCountsByPeriodDocument, variables, options);

export const UpdateUserDocument = `
    mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    id
    enabled
  }
}
    `;

export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>) => {
    
    return useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      {
    mutationKey: ['UpdateUser'],
    mutationFn: (variables?: UpdateUserMutationVariables) => graphqlClient<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables)(),
    ...options
  }
    )};


useUpdateUserMutation.fetcher = (variables: UpdateUserMutationVariables, options?: RequestInit['headers']) => graphqlClient<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, variables, options);

export const UpdateDrivingLicenseDocument = `
    mutation UpdateDrivingLicense($where: DrivingLicenseWhereUniqueInput!, $data: DrivingLicenseUpdateInput!) {
  updateDrivingLicense(where: $where, data: $data) {
    id
    state
  }
}
    `;

export const useUpdateDrivingLicenseMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateDrivingLicenseMutation, TError, UpdateDrivingLicenseMutationVariables, TContext>) => {
    
    return useMutation<UpdateDrivingLicenseMutation, TError, UpdateDrivingLicenseMutationVariables, TContext>(
      {
    mutationKey: ['UpdateDrivingLicense'],
    mutationFn: (variables?: UpdateDrivingLicenseMutationVariables) => graphqlClient<UpdateDrivingLicenseMutation, UpdateDrivingLicenseMutationVariables>(UpdateDrivingLicenseDocument, variables)(),
    ...options
  }
    )};


useUpdateDrivingLicenseMutation.fetcher = (variables: UpdateDrivingLicenseMutationVariables, options?: RequestInit['headers']) => graphqlClient<UpdateDrivingLicenseMutation, UpdateDrivingLicenseMutationVariables>(UpdateDrivingLicenseDocument, variables, options);

export const UpdateInsuranceDocument = `
    mutation UpdateInsurance($where: InsuranceWhereUniqueInput!, $data: InsuranceUpdateInput!) {
  updateInsurance(where: $where, data: $data) {
    id
    state
  }
}
    `;

export const useUpdateInsuranceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateInsuranceMutation, TError, UpdateInsuranceMutationVariables, TContext>) => {
    
    return useMutation<UpdateInsuranceMutation, TError, UpdateInsuranceMutationVariables, TContext>(
      {
    mutationKey: ['UpdateInsurance'],
    mutationFn: (variables?: UpdateInsuranceMutationVariables) => graphqlClient<UpdateInsuranceMutation, UpdateInsuranceMutationVariables>(UpdateInsuranceDocument, variables)(),
    ...options
  }
    )};


useUpdateInsuranceMutation.fetcher = (variables: UpdateInsuranceMutationVariables, options?: RequestInit['headers']) => graphqlClient<UpdateInsuranceMutation, UpdateInsuranceMutationVariables>(UpdateInsuranceDocument, variables, options);

export const UpdateRegistrationDocumentDocument = `
    mutation UpdateRegistrationDocument($where: RegistrationDocumentWhereUniqueInput!, $data: RegistrationDocumentUpdateInput!) {
  updateRegistrationDocument(where: $where, data: $data) {
    id
    state
  }
}
    `;

export const useUpdateRegistrationDocumentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateRegistrationDocumentMutation, TError, UpdateRegistrationDocumentMutationVariables, TContext>) => {
    
    return useMutation<UpdateRegistrationDocumentMutation, TError, UpdateRegistrationDocumentMutationVariables, TContext>(
      {
    mutationKey: ['UpdateRegistrationDocument'],
    mutationFn: (variables?: UpdateRegistrationDocumentMutationVariables) => graphqlClient<UpdateRegistrationDocumentMutation, UpdateRegistrationDocumentMutationVariables>(UpdateRegistrationDocumentDocument, variables)(),
    ...options
  }
    )};


useUpdateRegistrationDocumentMutation.fetcher = (variables: UpdateRegistrationDocumentMutationVariables, options?: RequestInit['headers']) => graphqlClient<UpdateRegistrationDocumentMutation, UpdateRegistrationDocumentMutationVariables>(UpdateRegistrationDocumentDocument, variables, options);

export const UpdateCertificateDocument = `
    mutation UpdateCertificate($where: CertificateWhereUniqueInput!, $data: CertificateUpdateInput!) {
  updateCertificate(where: $where, data: $data) {
    id
    state
  }
}
    `;

export const useUpdateCertificateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateCertificateMutation, TError, UpdateCertificateMutationVariables, TContext>) => {
    
    return useMutation<UpdateCertificateMutation, TError, UpdateCertificateMutationVariables, TContext>(
      {
    mutationKey: ['UpdateCertificate'],
    mutationFn: (variables?: UpdateCertificateMutationVariables) => graphqlClient<UpdateCertificateMutation, UpdateCertificateMutationVariables>(UpdateCertificateDocument, variables)(),
    ...options
  }
    )};


useUpdateCertificateMutation.fetcher = (variables: UpdateCertificateMutationVariables, options?: RequestInit['headers']) => graphqlClient<UpdateCertificateMutation, UpdateCertificateMutationVariables>(UpdateCertificateDocument, variables, options);

export const GetAdminRevenueStatsDocument = `
    query GetAdminRevenueStats($from: DateTime, $to: DateTime) {
  adminRevenueStats(from: $from, to: $to) {
    revenue
    fees
    basket
    count
  }
}
    `;

export const useGetAdminRevenueStatsQuery = <
      TData = GetAdminRevenueStatsQuery,
      TError = unknown
    >(
      variables?: GetAdminRevenueStatsQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminRevenueStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminRevenueStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminRevenueStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAdminRevenueStats'] : ['GetAdminRevenueStats', variables],
    queryFn: graphqlClient<GetAdminRevenueStatsQuery, GetAdminRevenueStatsQueryVariables>(GetAdminRevenueStatsDocument, variables),
    ...options
  }
    )};

useGetAdminRevenueStatsQuery.getKey = (variables?: GetAdminRevenueStatsQueryVariables) => variables === undefined ? ['GetAdminRevenueStats'] : ['GetAdminRevenueStats', variables];


useGetAdminRevenueStatsQuery.fetcher = (variables?: GetAdminRevenueStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminRevenueStatsQuery, GetAdminRevenueStatsQueryVariables>(GetAdminRevenueStatsDocument, variables, options);

export const GetAdminCoursesMetricsDocument = `
    query GetAdminCoursesMetrics($from: DateTime, $to: DateTime) {
  adminCoursesMetrics(from: $from, to: $to) {
    averageDistance
    averageDuration
    averagePrice
    averageAcceptanceTimeSeconds
    count
  }
}
    `;

export const useGetAdminCoursesMetricsQuery = <
      TData = GetAdminCoursesMetricsQuery,
      TError = unknown
    >(
      variables?: GetAdminCoursesMetricsQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminCoursesMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminCoursesMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminCoursesMetricsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAdminCoursesMetrics'] : ['GetAdminCoursesMetrics', variables],
    queryFn: graphqlClient<GetAdminCoursesMetricsQuery, GetAdminCoursesMetricsQueryVariables>(GetAdminCoursesMetricsDocument, variables),
    ...options
  }
    )};

useGetAdminCoursesMetricsQuery.getKey = (variables?: GetAdminCoursesMetricsQueryVariables) => variables === undefined ? ['GetAdminCoursesMetrics'] : ['GetAdminCoursesMetrics', variables];


useGetAdminCoursesMetricsQuery.fetcher = (variables?: GetAdminCoursesMetricsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminCoursesMetricsQuery, GetAdminCoursesMetricsQueryVariables>(GetAdminCoursesMetricsDocument, variables, options);

export const GetAdminCoursesTrendDocument = `
    query GetAdminCoursesTrend($days: Int!) {
  adminCoursesTrend(days: $days) {
    date
    count
  }
}
    `;

export const useGetAdminCoursesTrendQuery = <
      TData = GetAdminCoursesTrendQuery,
      TError = unknown
    >(
      variables: GetAdminCoursesTrendQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminCoursesTrendQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminCoursesTrendQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminCoursesTrendQuery, TError, TData>(
      {
    queryKey: ['GetAdminCoursesTrend', variables],
    queryFn: graphqlClient<GetAdminCoursesTrendQuery, GetAdminCoursesTrendQueryVariables>(GetAdminCoursesTrendDocument, variables),
    ...options
  }
    )};

useGetAdminCoursesTrendQuery.getKey = (variables: GetAdminCoursesTrendQueryVariables) => ['GetAdminCoursesTrend', variables];


useGetAdminCoursesTrendQuery.fetcher = (variables: GetAdminCoursesTrendQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminCoursesTrendQuery, GetAdminCoursesTrendQueryVariables>(GetAdminCoursesTrendDocument, variables, options);

export const GetAdminUsersTrendDocument = `
    query GetAdminUsersTrend($days: Int!) {
  adminUsersTrend(days: $days) {
    date
    count
  }
}
    `;

export const useGetAdminUsersTrendQuery = <
      TData = GetAdminUsersTrendQuery,
      TError = unknown
    >(
      variables: GetAdminUsersTrendQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminUsersTrendQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminUsersTrendQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminUsersTrendQuery, TError, TData>(
      {
    queryKey: ['GetAdminUsersTrend', variables],
    queryFn: graphqlClient<GetAdminUsersTrendQuery, GetAdminUsersTrendQueryVariables>(GetAdminUsersTrendDocument, variables),
    ...options
  }
    )};

useGetAdminUsersTrendQuery.getKey = (variables: GetAdminUsersTrendQueryVariables) => ['GetAdminUsersTrend', variables];


useGetAdminUsersTrendQuery.fetcher = (variables: GetAdminUsersTrendQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminUsersTrendQuery, GetAdminUsersTrendQueryVariables>(GetAdminUsersTrendDocument, variables, options);

export const GetAdminTicketsTrendDocument = `
    query GetAdminTicketsTrend($days: Int!) {
  adminTicketsTrend(days: $days) {
    date
    count
  }
}
    `;

export const useGetAdminTicketsTrendQuery = <
      TData = GetAdminTicketsTrendQuery,
      TError = unknown
    >(
      variables: GetAdminTicketsTrendQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminTicketsTrendQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminTicketsTrendQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminTicketsTrendQuery, TError, TData>(
      {
    queryKey: ['GetAdminTicketsTrend', variables],
    queryFn: graphqlClient<GetAdminTicketsTrendQuery, GetAdminTicketsTrendQueryVariables>(GetAdminTicketsTrendDocument, variables),
    ...options
  }
    )};

useGetAdminTicketsTrendQuery.getKey = (variables: GetAdminTicketsTrendQueryVariables) => ['GetAdminTicketsTrend', variables];


useGetAdminTicketsTrendQuery.fetcher = (variables: GetAdminTicketsTrendQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminTicketsTrendQuery, GetAdminTicketsTrendQueryVariables>(GetAdminTicketsTrendDocument, variables, options);

export const GetAdminDriversAverageRatingDocument = `
    query GetAdminDriversAverageRating {
  adminDriversAverageRating
}
    `;

export const useGetAdminDriversAverageRatingQuery = <
      TData = GetAdminDriversAverageRatingQuery,
      TError = unknown
    >(
      variables?: GetAdminDriversAverageRatingQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminDriversAverageRatingQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminDriversAverageRatingQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminDriversAverageRatingQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAdminDriversAverageRating'] : ['GetAdminDriversAverageRating', variables],
    queryFn: graphqlClient<GetAdminDriversAverageRatingQuery, GetAdminDriversAverageRatingQueryVariables>(GetAdminDriversAverageRatingDocument, variables),
    ...options
  }
    )};

useGetAdminDriversAverageRatingQuery.getKey = (variables?: GetAdminDriversAverageRatingQueryVariables) => variables === undefined ? ['GetAdminDriversAverageRating'] : ['GetAdminDriversAverageRating', variables];


useGetAdminDriversAverageRatingQuery.fetcher = (variables?: GetAdminDriversAverageRatingQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminDriversAverageRatingQuery, GetAdminDriversAverageRatingQueryVariables>(GetAdminDriversAverageRatingDocument, variables, options);

export const GetAdminPendingDocumentsCountDocument = `
    query GetAdminPendingDocumentsCount {
  adminPendingDocumentsCount
}
    `;

export const useGetAdminPendingDocumentsCountQuery = <
      TData = GetAdminPendingDocumentsCountQuery,
      TError = unknown
    >(
      variables?: GetAdminPendingDocumentsCountQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminPendingDocumentsCountQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminPendingDocumentsCountQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminPendingDocumentsCountQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetAdminPendingDocumentsCount'] : ['GetAdminPendingDocumentsCount', variables],
    queryFn: graphqlClient<GetAdminPendingDocumentsCountQuery, GetAdminPendingDocumentsCountQueryVariables>(GetAdminPendingDocumentsCountDocument, variables),
    ...options
  }
    )};

useGetAdminPendingDocumentsCountQuery.getKey = (variables?: GetAdminPendingDocumentsCountQueryVariables) => variables === undefined ? ['GetAdminPendingDocumentsCount'] : ['GetAdminPendingDocumentsCount', variables];


useGetAdminPendingDocumentsCountQuery.fetcher = (variables?: GetAdminPendingDocumentsCountQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminPendingDocumentsCountQuery, GetAdminPendingDocumentsCountQueryVariables>(GetAdminPendingDocumentsCountDocument, variables, options);

export const GetAdminDocumentsDocument = `
    query GetAdminDocuments($type: AdminDocumentType, $state: AdminDocumentState, $take: Int!, $skip: Int!) {
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
    }
  }
}
    `;

export const useGetAdminDocumentsQuery = <
      TData = GetAdminDocumentsQuery,
      TError = unknown
    >(
      variables: GetAdminDocumentsQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminDocumentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminDocumentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminDocumentsQuery, TError, TData>(
      {
    queryKey: ['GetAdminDocuments', variables],
    queryFn: graphqlClient<GetAdminDocumentsQuery, GetAdminDocumentsQueryVariables>(GetAdminDocumentsDocument, variables),
    ...options
  }
    )};

useGetAdminDocumentsQuery.getKey = (variables: GetAdminDocumentsQueryVariables) => ['GetAdminDocuments', variables];


useGetAdminDocumentsQuery.fetcher = (variables: GetAdminDocumentsQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminDocumentsQuery, GetAdminDocumentsQueryVariables>(GetAdminDocumentsDocument, variables, options);

export const GetAdminDailyAggregatesDocument = `
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
    `;

export const useGetAdminDailyAggregatesQuery = <
      TData = GetAdminDailyAggregatesQuery,
      TError = unknown
    >(
      variables: GetAdminDailyAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<GetAdminDailyAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetAdminDailyAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetAdminDailyAggregatesQuery, TError, TData>(
      {
    queryKey: ['GetAdminDailyAggregates', variables],
    queryFn: graphqlClient<GetAdminDailyAggregatesQuery, GetAdminDailyAggregatesQueryVariables>(GetAdminDailyAggregatesDocument, variables),
    ...options
  }
    )};

useGetAdminDailyAggregatesQuery.getKey = (variables: GetAdminDailyAggregatesQueryVariables) => ['GetAdminDailyAggregates', variables];


useGetAdminDailyAggregatesQuery.fetcher = (variables: GetAdminDailyAggregatesQueryVariables, options?: RequestInit['headers']) => graphqlClient<GetAdminDailyAggregatesQuery, GetAdminDailyAggregatesQueryVariables>(GetAdminDailyAggregatesDocument, variables, options);
