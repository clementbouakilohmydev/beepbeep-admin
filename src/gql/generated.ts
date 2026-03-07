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
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
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
  picture?: Maybe<ImageFieldOutput>;
  registrationDatetime?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type CertificateCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetime?: InputMaybe<Scalars['DateTime']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
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
  picture?: InputMaybe<ImageFieldInput>;
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
  askedBy?: Maybe<Scalars['String']['output']>;
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
  ratings?: Maybe<Rating>;
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

export type CourseCreateInput = {
  askedBy?: InputMaybe<Scalars['String']['input']>;
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
  ratings?: InputMaybe<RatingRelateToOneForCreateInput>;
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
  askedBy?: InputMaybe<OrderDirection>;
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
  askedBy?: InputMaybe<Scalars['String']['input']>;
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
  ratings?: InputMaybe<RatingRelateToOneForUpdateInput>;
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
  askedBy?: InputMaybe<StringFilter>;
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
  ratings?: InputMaybe<RatingWhereInput>;
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
  ratings?: InputMaybe<RatingWhereUniqueInput>;
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
  radius: Scalars['Int']['input'];
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
  isoWeekday?: InputMaybe<IntNullableFilter>;
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
  id: Scalars['ID']['output'];
  obtentionYear?: Maybe<Scalars['Int']['output']>;
  picture?: Maybe<ImageFieldOutput>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type DrivingLicenseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  obtentionYear?: InputMaybe<Scalars['Int']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type DrivingLicenseOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
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
  obtentionYear?: InputMaybe<Scalars['Int']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type DrivingLicenseWhereInput = {
  AND?: InputMaybe<Array<DrivingLicenseWhereInput>>;
  NOT?: InputMaybe<Array<DrivingLicenseWhereInput>>;
  OR?: InputMaybe<Array<DrivingLicenseWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  obtentionYear?: InputMaybe<IntNullableFilter>;
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

export type ImageExtension =
  | 'gif'
  | 'jpg'
  | 'png'
  | 'webp';

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type Insurance = {
  __typename?: 'Insurance';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expirationDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  picture?: Maybe<ImageFieldOutput>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type InsuranceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expirationDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
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
  picture?: InputMaybe<ImageFieldInput>;
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
  clearPushTokens?: Maybe<ClearPushTokensType>;
  createAddress?: Maybe<Address>;
  createAddresses?: Maybe<Array<Maybe<Address>>>;
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
  deleteInsurance?: Maybe<Insurance>;
  deleteInsurances?: Maybe<Array<Maybe<Insurance>>>;
  deleteLocation?: Maybe<Location>;
  deleteLocations?: Maybe<Array<Maybe<Location>>>;
  deleteMessage?: Maybe<Message>;
  deleteMessages?: Maybe<Array<Maybe<Message>>>;
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
  resetPassword: ResetPasswordType;
  sendUserCode: SendUserCodeType;
  terminateCourse?: Maybe<Scalars['Boolean']['output']>;
  updateAddress?: Maybe<Address>;
  updateAddresses?: Maybe<Array<Maybe<Address>>>;
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


export type MutationCreateAddressArgs = {
  data: AddressCreateInput;
};


export type MutationCreateAddressesArgs = {
  data: Array<AddressCreateInput>;
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
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
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
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type PageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
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
  id: Scalars['ID']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  stripeCaptured?: Maybe<Scalars['Boolean']['output']>;
  stripeIntentId?: Maybe<Scalars['String']['output']>;
  stripeTransferId?: Maybe<Scalars['String']['output']>;
  trip?: Maybe<Trip>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type PaymentCreateInput = {
  course?: InputMaybe<CourseRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  stripeCaptured?: InputMaybe<Scalars['Boolean']['input']>;
  stripeIntentId?: InputMaybe<Scalars['String']['input']>;
  stripeTransferId?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  stripeCaptured?: InputMaybe<OrderDirection>;
  stripeIntentId?: InputMaybe<OrderDirection>;
  stripeTransferId?: InputMaybe<OrderDirection>;
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
  price?: InputMaybe<Scalars['Float']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  stripeCaptured?: InputMaybe<Scalars['Boolean']['input']>;
  stripeIntentId?: InputMaybe<Scalars['String']['input']>;
  stripeTransferId?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<IdFilter>;
  price?: InputMaybe<FloatNullableFilter>;
  state?: InputMaybe<StringNullableFilter>;
  stripeCaptured?: InputMaybe<BooleanFilter>;
  stripeIntentId?: InputMaybe<StringNullableFilter>;
  stripeTransferId?: InputMaybe<StringNullableFilter>;
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

export type RatingRelateToOneForCreateInput = {
  connect?: InputMaybe<RatingWhereUniqueInput>;
  create?: InputMaybe<RatingCreateInput>;
};

export type RatingRelateToOneForUpdateInput = {
  connect?: InputMaybe<RatingWhereUniqueInput>;
  create?: InputMaybe<RatingCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
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
  course?: InputMaybe<CourseWhereUniqueInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type RegistrationDocument = {
  __typename?: 'RegistrationDocument';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  picture?: Maybe<ImageFieldOutput>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type RegistrationDocumentCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  picture?: InputMaybe<ImageFieldInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type RegistrationDocumentOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
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
  picture?: InputMaybe<ImageFieldInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type RegistrationDocumentWhereInput = {
  AND?: InputMaybe<Array<RegistrationDocumentWhereInput>>;
  NOT?: InputMaybe<Array<RegistrationDocumentWhereInput>>;
  OR?: InputMaybe<Array<RegistrationDocumentWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
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
  object?: Maybe<TicketObject>;
  solved?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type TicketCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  object?: InputMaybe<TicketObjectRelateToOneForCreateInput>;
  solved?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
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

export type TicketUpdateArgs = {
  data: TicketUpdateInput;
  where: TicketWhereUniqueInput;
};

export type TicketUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
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
  availableDrivers?: Maybe<Array<Maybe<Driver>>>;
  courses?: Maybe<Array<Course>>;
  coursesCount?: Maybe<Scalars['Int']['output']>;
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
  avatar?: Maybe<ImageFieldOutput>;
  averageRate?: Maybe<Scalars['Float']['output']>;
  balance?: Maybe<Scalars['Float']['output']>;
  bankAccount?: Maybe<UserBankAccountType>;
  birthdayDatetimeUtc?: Maybe<Scalars['DateTime']['output']>;
  cards?: Maybe<Array<Maybe<UserCardType>>>;
  certificate?: Maybe<Certificate>;
  coursesCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
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
  avatar?: InputMaybe<ImageFieldInput>;
  birthdayDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  certificate?: InputMaybe<CertificateRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
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
  avatar?: InputMaybe<ImageFieldInput>;
  birthdayDatetimeUtc?: InputMaybe<Scalars['DateTime']['input']>;
  certificate?: InputMaybe<CertificateRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
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
  birthdayDatetimeUtc?: InputMaybe<DateTimeNullableFilter>;
  certificate?: InputMaybe<CertificateWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
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


export type GetUsersQuery = { __typename?: 'Query', usersCount?: number | null, users?: Array<{ __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, type?: string | null, isAdmin?: boolean | null, enabled?: boolean | null, phoneNumber?: string | null, createdAt?: any | null }> | null };

export type GetTicketsQueryVariables = Exact<{
  where: TicketWhereInput;
  orderBy: Array<TicketOrderByInput> | TicketOrderByInput;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
}>;


export type GetTicketsQuery = { __typename?: 'Query', ticketsCount?: number | null, tickets?: Array<{ __typename?: 'Ticket', id: string, solved?: boolean | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, object?: { __typename?: 'TicketObject', id: string, object?: string | null } | null, user?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null } | null }> | null };

export type GetTicketsCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketsCountsQuery = { __typename?: 'Query', pending?: number | null, solved?: number | null };

export type GetTicketQueryVariables = Exact<{
  where: TicketWhereUniqueInput;
}>;


export type GetTicketQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', id: string, solved?: boolean | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, object?: { __typename?: 'TicketObject', id: string, object?: string | null } | null, user?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, phoneNumber?: string | null } | null } | null };

export type UpdateTicketMutationVariables = Exact<{
  where: TicketWhereUniqueInput;
  data: TicketUpdateInput;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket?: { __typename?: 'Ticket', id: string, solved?: boolean | null } | null };

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email?: string | null, firstname?: string | null, lastname?: string | null, type?: string | null, isAdmin?: boolean | null, enabled?: boolean | null, anonymized?: boolean | null, phoneNumber?: string | null, birthdayDatetimeUtc?: any | null, affiliationCode?: string | null, age?: number | null, averageRate?: number | null, coursesCount?: number | null, stripeCustomerId?: string | null, pushNotifications?: boolean | null, createdAt?: any | null, updatedAt?: any | null } | null };



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
