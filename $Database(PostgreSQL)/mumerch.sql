PGDMP     4    1                {            mumerch    15.3    15.3 `    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17120    mumerch    DATABASE     �   CREATE DATABASE mumerch WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE mumerch;
                postgres    false                        3079    17121 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    17162    Band    TABLE     �   CREATE TABLE public."Band" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    image character varying NOT NULL,
    "loginId" character varying
);
    DROP TABLE public."Band";
       public         heap    postgres    false    2            �            1259    17150    BandManager    TABLE     �   CREATE TABLE public."BandManager" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "loginId" character varying,
    "bandId" uuid,
    "bandManagerId" character varying
);
 !   DROP TABLE public."BandManager";
       public         heap    postgres    false    2            �            1259    17142    Category    TABLE     �   CREATE TABLE public."Category" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "loginId" character varying
);
    DROP TABLE public."Category";
       public         heap    postgres    false    2            �            1259    17228    Color    TABLE     �   CREATE TABLE public."Color" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "colorCode" character varying NOT NULL,
    "loginId" character varying
);
    DROP TABLE public."Color";
       public         heap    postgres    false    2            �            1259    17198    Customer    TABLE     �   CREATE TABLE public."Customer" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "phoneNo" character varying NOT NULL,
    "loginId" character varying
);
    DROP TABLE public."Customer";
       public         heap    postgres    false    2            �            1259    17236    Designation    TABLE     �   CREATE TABLE public."Designation" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "updaterId" character varying
);
 !   DROP TABLE public."Designation";
       public         heap    postgres    false    2            �            1259    17190    Gig    TABLE     �   CREATE TABLE public."Gig" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "startDate" character varying NOT NULL,
    "endDate" character varying NOT NULL,
    name character varying NOT NULL,
    "loginId" character varying
);
    DROP TABLE public."Gig";
       public         heap    postgres    false    2            �            1259    17178 
   GigManager    TABLE     �   CREATE TABLE public."GigManager" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "loginId" character varying,
    "gigId" uuid,
    "gigManagerId" character varying
);
     DROP TABLE public."GigManager";
       public         heap    postgres    false    2            �            1259    17254    Login    TABLE     *  CREATE TABLE public."Login" (
    id character varying NOT NULL,
    name character varying NOT NULL,
    password character varying NOT NULL,
    "userType" character varying NOT NULL,
    email character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    "designationId" uuid
);
    DROP TABLE public."Login";
       public         heap    postgres    false            �            1259    17423    Order    TABLE     �   CREATE TABLE public."Order" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date timestamp without time zone,
    "loginId" character varying,
    "gigId" uuid,
    "customerId" uuid
);
    DROP TABLE public."Order";
       public         heap    postgres    false    2            �            1259    17431    OrderProductsMap    TABLE     �   CREATE TABLE public."OrderProductsMap" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "orderQuantity" integer NOT NULL,
    "orderPrice" integer NOT NULL,
    "orderId" uuid,
    "productDetailsId" uuid
);
 &   DROP TABLE public."OrderProductsMap";
       public         heap    postgres    false    2            �            1259    17170    Product    TABLE       CREATE TABLE public."Product" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    price integer NOT NULL,
    "revenuePercentage" integer NOT NULL,
    "loginId" character varying,
    "categoryId" uuid,
    "bandId" uuid
);
    DROP TABLE public."Product";
       public         heap    postgres    false    2            �            1259    17220    ProductDetails    TABLE     �   CREATE TABLE public."ProductDetails" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    quantity integer NOT NULL,
    name character varying NOT NULL,
    "colorId" uuid,
    "sizeId" uuid,
    "productId" uuid
);
 $   DROP TABLE public."ProductDetails";
       public         heap    postgres    false    2            �            1259    17261    Size    TABLE     �   CREATE TABLE public."Size" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "loginId" character varying,
    measurement integer NOT NULL
);
    DROP TABLE public."Size";
       public         heap    postgres    false    2            �            1259    17244    Token    TABLE     	  CREATE TABLE public."Token" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    token character varying NOT NULL,
    "startTime" timestamp without time zone NOT NULL,
    "endTime" timestamp without time zone NOT NULL,
    "loginId" character varying
);
    DROP TABLE public."Token";
       public         heap    postgres    false    2            �            1259    17132    User    TABLE     �  CREATE TABLE public."User" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "fatherName" character varying NOT NULL,
    "motherName" character varying NOT NULL,
    "dateOfBirth" timestamp without time zone NOT NULL,
    "bloodGroup" character varying NOT NULL,
    image character varying NOT NULL,
    address character varying NOT NULL,
    "loginId" character varying,
    "nidNo" character varying NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    2            �          0    17162    Band 
   TABLE DATA           <   COPY public."Band" (id, name, image, "loginId") FROM stdin;
    public          postgres    false    218   R�       �          0    17150    BandManager 
   TABLE DATA           Q   COPY public."BandManager" (id, "loginId", "bandId", "bandManagerId") FROM stdin;
    public          postgres    false    217   ҄       �          0    17142    Category 
   TABLE DATA           9   COPY public."Category" (id, name, "loginId") FROM stdin;
    public          postgres    false    216   ;�       �          0    17228    Color 
   TABLE DATA           C   COPY public."Color" (id, name, "colorCode", "loginId") FROM stdin;
    public          postgres    false    224   �       �          0    17198    Customer 
   TABLE DATA           K   COPY public."Customer" (id, name, email, "phoneNo", "loginId") FROM stdin;
    public          postgres    false    222   ˆ       �          0    17236    Designation 
   TABLE DATA           >   COPY public."Designation" (id, name, "updaterId") FROM stdin;
    public          postgres    false    225   ��       �          0    17190    Gig 
   TABLE DATA           L   COPY public."Gig" (id, "startDate", "endDate", name, "loginId") FROM stdin;
    public          postgres    false    221   �       �          0    17178 
   GigManager 
   TABLE DATA           N   COPY public."GigManager" (id, "loginId", "gigId", "gigManagerId") FROM stdin;
    public          postgres    false    220   ��       �          0    17254    Login 
   TABLE DATA           h   COPY public."Login" (id, name, password, "userType", email, "phoneNumber", "designationId") FROM stdin;
    public          postgres    false    227   �       �          0    17423    Order 
   TABLE DATA           M   COPY public."Order" (id, date, "loginId", "gigId", "customerId") FROM stdin;
    public          postgres    false    229   Ջ       �          0    17431    OrderProductsMap 
   TABLE DATA           n   COPY public."OrderProductsMap" (id, "orderQuantity", "orderPrice", "orderId", "productDetailsId") FROM stdin;
    public          postgres    false    230   Y�       �          0    17170    Product 
   TABLE DATA           l   COPY public."Product" (id, name, price, "revenuePercentage", "loginId", "categoryId", "bandId") FROM stdin;
    public          postgres    false    219   Ɍ       �          0    17220    ProductDetails 
   TABLE DATA           `   COPY public."ProductDetails" (id, quantity, name, "colorId", "sizeId", "productId") FROM stdin;
    public          postgres    false    223   ��       �          0    17261    Size 
   TABLE DATA           B   COPY public."Size" (id, name, "loginId", measurement) FROM stdin;
    public          postgres    false    228   8�       �          0    17244    Token 
   TABLE DATA           O   COPY public."Token" (id, token, "startTime", "endTime", "loginId") FROM stdin;
    public          postgres    false    226   ��       �          0    17132    User 
   TABLE DATA           �   COPY public."User" (id, "fatherName", "motherName", "dateOfBirth", "bloodGroup", image, address, "loginId", "nidNo") FROM stdin;
    public          postgres    false    215   Î       �           2606    17197 "   Gig PK_19551d0e004b46b12a6943baefa 
   CONSTRAINT     d   ALTER TABLE ONLY public."Gig"
    ADD CONSTRAINT "PK_19551d0e004b46b12a6943baefa" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Gig" DROP CONSTRAINT "PK_19551d0e004b46b12a6943baefa";
       public            postgres    false    221            �           2606    17251 $   Token PK_206d2a22c0a6839d849fb7016b5 
   CONSTRAINT     f   ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "PK_206d2a22c0a6839d849fb7016b5" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Token" DROP CONSTRAINT "PK_206d2a22c0a6839d849fb7016b5";
       public            postgres    false    226            �           2606    17268 #   Size PK_2a370d6ce0ec366a420059489e5 
   CONSTRAINT     e   ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "PK_2a370d6ce0ec366a420059489e5" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Size" DROP CONSTRAINT "PK_2a370d6ce0ec366a420059489e5";
       public            postgres    false    228            �           2606    17430 $   Order PK_3d5a3861d8f9a6db372b2b317b7 
   CONSTRAINT     f   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7";
       public            postgres    false    229            �           2606    17227 -   ProductDetails PK_4c10a90561dc5682fbc9b6dee9c 
   CONSTRAINT     o   ALTER TABLE ONLY public."ProductDetails"
    ADD CONSTRAINT "PK_4c10a90561dc5682fbc9b6dee9c" PRIMARY KEY (id);
 [   ALTER TABLE ONLY public."ProductDetails" DROP CONSTRAINT "PK_4c10a90561dc5682fbc9b6dee9c";
       public            postgres    false    223            �           2606    17260 $   Login PK_5f13afd170e4a02c00a68bfe4c1 
   CONSTRAINT     f   ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "PK_5f13afd170e4a02c00a68bfe4c1" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Login" DROP CONSTRAINT "PK_5f13afd170e4a02c00a68bfe4c1";
       public            postgres    false    227            �           2606    17205 '   Customer PK_60596e16740e1fa20dbf0154ec7 
   CONSTRAINT     i   ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "PK_60596e16740e1fa20dbf0154ec7" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "PK_60596e16740e1fa20dbf0154ec7";
       public            postgres    false    222            �           2606    17139 #   User PK_9862f679340fb2388436a5ab3e4 
   CONSTRAINT     e   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."User" DROP CONSTRAINT "PK_9862f679340fb2388436a5ab3e4";
       public            postgres    false    215            �           2606    17157 *   BandManager PK_990ff90e6fa4e6b30708048508d 
   CONSTRAINT     l   ALTER TABLE ONLY public."BandManager"
    ADD CONSTRAINT "PK_990ff90e6fa4e6b30708048508d" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."BandManager" DROP CONSTRAINT "PK_990ff90e6fa4e6b30708048508d";
       public            postgres    false    217            �           2606    17243 *   Designation PK_9ce84d2519b60d2cc3a8b4f1845 
   CONSTRAINT     l   ALTER TABLE ONLY public."Designation"
    ADD CONSTRAINT "PK_9ce84d2519b60d2cc3a8b4f1845" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Designation" DROP CONSTRAINT "PK_9ce84d2519b60d2cc3a8b4f1845";
       public            postgres    false    225            �           2606    17177 &   Product PK_9fc040db7872192bbc26c515710 
   CONSTRAINT     h   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "PK_9fc040db7872192bbc26c515710";
       public            postgres    false    219            �           2606    17169 #   Band PK_aaef6d600ef7d6c44f8143eceb3 
   CONSTRAINT     e   ALTER TABLE ONLY public."Band"
    ADD CONSTRAINT "PK_aaef6d600ef7d6c44f8143eceb3" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Band" DROP CONSTRAINT "PK_aaef6d600ef7d6c44f8143eceb3";
       public            postgres    false    218            �           2606    17149 '   Category PK_c2727780c5b9b0c564c29a4977c 
   CONSTRAINT     i   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c";
       public            postgres    false    216            �           2606    17235 $   Color PK_d280a3695acb80ea97908df0e15 
   CONSTRAINT     f   ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "PK_d280a3695acb80ea97908df0e15" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."Color" DROP CONSTRAINT "PK_d280a3695acb80ea97908df0e15";
       public            postgres    false    224            �           2606    17185 )   GigManager PK_f64329db4f390be8d3126850b39 
   CONSTRAINT     k   ALTER TABLE ONLY public."GigManager"
    ADD CONSTRAINT "PK_f64329db4f390be8d3126850b39" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public."GigManager" DROP CONSTRAINT "PK_f64329db4f390be8d3126850b39";
       public            postgres    false    220            �           2606    17436 /   OrderProductsMap PK_f6ac3094e866984910d1ae22bbc 
   CONSTRAINT     q   ALTER TABLE ONLY public."OrderProductsMap"
    ADD CONSTRAINT "PK_f6ac3094e866984910d1ae22bbc" PRIMARY KEY (id);
 ]   ALTER TABLE ONLY public."OrderProductsMap" DROP CONSTRAINT "PK_f6ac3094e866984910d1ae22bbc";
       public            postgres    false    230            �           2606    17159 *   BandManager REL_0c528d59f96fb9081b82ed430e 
   CONSTRAINT     m   ALTER TABLE ONLY public."BandManager"
    ADD CONSTRAINT "REL_0c528d59f96fb9081b82ed430e" UNIQUE ("bandId");
 X   ALTER TABLE ONLY public."BandManager" DROP CONSTRAINT "REL_0c528d59f96fb9081b82ed430e";
       public            postgres    false    217            �           2606    17161 *   BandManager REL_35340fb1f32ed9a974c5214a59 
   CONSTRAINT     t   ALTER TABLE ONLY public."BandManager"
    ADD CONSTRAINT "REL_35340fb1f32ed9a974c5214a59" UNIQUE ("bandManagerId");
 X   ALTER TABLE ONLY public."BandManager" DROP CONSTRAINT "REL_35340fb1f32ed9a974c5214a59";
       public            postgres    false    217            �           2606    17253 $   Token REL_43818a9e8f90303fc61715dfc2 
   CONSTRAINT     h   ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "REL_43818a9e8f90303fc61715dfc2" UNIQUE ("loginId");
 R   ALTER TABLE ONLY public."Token" DROP CONSTRAINT "REL_43818a9e8f90303fc61715dfc2";
       public            postgres    false    226            �           2606    17187 )   GigManager REL_54d25d1ae4be5fcfaf3d0dc611 
   CONSTRAINT     k   ALTER TABLE ONLY public."GigManager"
    ADD CONSTRAINT "REL_54d25d1ae4be5fcfaf3d0dc611" UNIQUE ("gigId");
 W   ALTER TABLE ONLY public."GigManager" DROP CONSTRAINT "REL_54d25d1ae4be5fcfaf3d0dc611";
       public            postgres    false    220            �           2606    17189 )   GigManager REL_934e94bd485bdf5715484931c7 
   CONSTRAINT     r   ALTER TABLE ONLY public."GigManager"
    ADD CONSTRAINT "REL_934e94bd485bdf5715484931c7" UNIQUE ("gigManagerId");
 W   ALTER TABLE ONLY public."GigManager" DROP CONSTRAINT "REL_934e94bd485bdf5715484931c7";
       public            postgres    false    220            �           2606    17141 #   User REL_f22e0f7497ecf29ebc8d6c807d 
   CONSTRAINT     g   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "REL_f22e0f7497ecf29ebc8d6c807d" UNIQUE ("loginId");
 Q   ALTER TABLE ONLY public."User" DROP CONSTRAINT "REL_f22e0f7497ecf29ebc8d6c807d";
       public            postgres    false    215            �           2606    17409 &   Product UQ_08cd99ca921561a289373c14b42 
   CONSTRAINT     e   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "UQ_08cd99ca921561a289373c14b42" UNIQUE (name);
 T   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "UQ_08cd99ca921561a289373c14b42";
       public            postgres    false    219            �           2606    17407 '   Category UQ_0ac420e8701e781dbf1231dc230 
   CONSTRAINT     f   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "UQ_0ac420e8701e781dbf1231dc230" UNIQUE (name);
 U   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "UQ_0ac420e8701e781dbf1231dc230";
       public            postgres    false    216            �           2606    17413 $   Color UQ_433e491ee48642919c317211a94 
   CONSTRAINT     j   ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "UQ_433e491ee48642919c317211a94" UNIQUE ("colorCode");
 R   ALTER TABLE ONLY public."Color" DROP CONSTRAINT "UQ_433e491ee48642919c317211a94";
       public            postgres    false    224            �           2606    17415 *   Designation UQ_4fbe45764ba59d38a8892e1c1b8 
   CONSTRAINT     i   ALTER TABLE ONLY public."Designation"
    ADD CONSTRAINT "UQ_4fbe45764ba59d38a8892e1c1b8" UNIQUE (name);
 X   ALTER TABLE ONLY public."Designation" DROP CONSTRAINT "UQ_4fbe45764ba59d38a8892e1c1b8";
       public            postgres    false    225            �           2606    17403 #   Band UQ_5a0a8d304311b9f623885ea0601 
   CONSTRAINT     b   ALTER TABLE ONLY public."Band"
    ADD CONSTRAINT "UQ_5a0a8d304311b9f623885ea0601" UNIQUE (name);
 Q   ALTER TABLE ONLY public."Band" DROP CONSTRAINT "UQ_5a0a8d304311b9f623885ea0601";
       public            postgres    false    218            �           2606    17421 #   Size UQ_9632a68ca7110786f2a75270079 
   CONSTRAINT     b   ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "UQ_9632a68ca7110786f2a75270079" UNIQUE (name);
 Q   ALTER TABLE ONLY public."Size" DROP CONSTRAINT "UQ_9632a68ca7110786f2a75270079";
       public            postgres    false    228            �           2606    17417 $   Login UQ_9b67cd2c02144b9a0b0f021a736 
   CONSTRAINT     d   ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "UQ_9b67cd2c02144b9a0b0f021a736" UNIQUE (email);
 R   ALTER TABLE ONLY public."Login" DROP CONSTRAINT "UQ_9b67cd2c02144b9a0b0f021a736";
       public            postgres    false    227            �           2606    17405 #   User UQ_b65ab9cf8a8114eee44fe40d8ac 
   CONSTRAINT     e   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "UQ_b65ab9cf8a8114eee44fe40d8ac" UNIQUE ("nidNo");
 Q   ALTER TABLE ONLY public."User" DROP CONSTRAINT "UQ_b65ab9cf8a8114eee44fe40d8ac";
       public            postgres    false    215            �           2606    17419 $   Login UQ_dfdb2010990e2ec6e22762d8558 
   CONSTRAINT     l   ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "UQ_dfdb2010990e2ec6e22762d8558" UNIQUE ("phoneNumber");
 R   ALTER TABLE ONLY public."Login" DROP CONSTRAINT "UQ_dfdb2010990e2ec6e22762d8558";
       public            postgres    false    227            �           2606    17284 *   BandManager FK_0c528d59f96fb9081b82ed430ed    FK CONSTRAINT     �   ALTER TABLE ONLY public."BandManager"
    ADD CONSTRAINT "FK_0c528d59f96fb9081b82ed430ed" FOREIGN KEY ("bandId") REFERENCES public."Band"(id);
 X   ALTER TABLE ONLY public."BandManager" DROP CONSTRAINT "FK_0c528d59f96fb9081b82ed430ed";
       public          postgres    false    218    3275    217                       2606    17447 $   Order FK_0f88449168b8ffae36cb3f8a140    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "FK_0f88449168b8ffae36cb3f8a140" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id);
 R   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "FK_0f88449168b8ffae36cb3f8a140";
       public          postgres    false    229    222    3291            �           2606    17309 &   Product FK_16c91b7acf96ea9c3240691e325    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "FK_16c91b7acf96ea9c3240691e325" FOREIGN KEY ("bandId") REFERENCES public."Band"(id);
 T   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "FK_16c91b7acf96ea9c3240691e325";
       public          postgres    false    218    3275    219            �           2606    17274 '   Category FK_1cdd9a56a365edadb62f5159836    FK CONSTRAINT     �   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "FK_1cdd9a56a365edadb62f5159836" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 U   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "FK_1cdd9a56a365edadb62f5159836";
       public          postgres    false    3307    216    227            �           2606    17299 &   Product FK_290f92b08123c6d4935d2766fca    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "FK_290f92b08123c6d4935d2766fca" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 T   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "FK_290f92b08123c6d4935d2766fca";
       public          postgres    false    3307    227    219            
           2606    17472 *   Designation FK_2b569d58bc95a329cb691f95976    FK CONSTRAINT     �   ALTER TABLE ONLY public."Designation"
    ADD CONSTRAINT "FK_2b569d58bc95a329cb691f95976" FOREIGN KEY ("updaterId") REFERENCES public."Login"(id);
 X   ALTER TABLE ONLY public."Designation" DROP CONSTRAINT "FK_2b569d58bc95a329cb691f95976";
       public          postgres    false    225    3307    227                       2606    17369 -   ProductDetails FK_301420082d9d2f0b5982efe75fb    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProductDetails"
    ADD CONSTRAINT "FK_301420082d9d2f0b5982efe75fb" FOREIGN KEY ("sizeId") REFERENCES public."Size"(id);
 [   ALTER TABLE ONLY public."ProductDetails" DROP CONSTRAINT "FK_301420082d9d2f0b5982efe75fb";
       public          postgres    false    3313    223    228            �           2606    17289 *   BandManager FK_35340fb1f32ed9a974c5214a59e    FK CONSTRAINT     �   ALTER TABLE ONLY public."BandManager"
    ADD CONSTRAINT "FK_35340fb1f32ed9a974c5214a59e" FOREIGN KEY ("bandManagerId") REFERENCES public."Login"(id);
 X   ALTER TABLE ONLY public."BandManager" DROP CONSTRAINT "FK_35340fb1f32ed9a974c5214a59e";
       public          postgres    false    3307    227    217                       2606    17374 -   ProductDetails FK_3640c02a4a3d1cb4713398f3a75    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProductDetails"
    ADD CONSTRAINT "FK_3640c02a4a3d1cb4713398f3a75" FOREIGN KEY ("productId") REFERENCES public."Product"(id);
 [   ALTER TABLE ONLY public."ProductDetails" DROP CONSTRAINT "FK_3640c02a4a3d1cb4713398f3a75";
       public          postgres    false    223    219    3279            �           2606    17279 *   BandManager FK_3b6f6fd5a49fcee3df9e7ac1dd5    FK CONSTRAINT     �   ALTER TABLE ONLY public."BandManager"
    ADD CONSTRAINT "FK_3b6f6fd5a49fcee3df9e7ac1dd5" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 X   ALTER TABLE ONLY public."BandManager" DROP CONSTRAINT "FK_3b6f6fd5a49fcee3df9e7ac1dd5";
       public          postgres    false    227    217    3307                       2606    17384 $   Token FK_43818a9e8f90303fc61715dfc2f    FK CONSTRAINT     �   ALTER TABLE ONLY public."Token"
    ADD CONSTRAINT "FK_43818a9e8f90303fc61715dfc2f" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 R   ALTER TABLE ONLY public."Token" DROP CONSTRAINT "FK_43818a9e8f90303fc61715dfc2f";
       public          postgres    false    226    3307    227                       2606    17389 $   Login FK_495e027295d1c45872530aedc67    FK CONSTRAINT     �   ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "FK_495e027295d1c45872530aedc67" FOREIGN KEY ("designationId") REFERENCES public."Designation"(id);
 R   ALTER TABLE ONLY public."Login" DROP CONSTRAINT "FK_495e027295d1c45872530aedc67";
       public          postgres    false    3299    225    227                       2606    17437 $   Order FK_5024af4540ba1c3ef2f0bb025c9    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "FK_5024af4540ba1c3ef2f0bb025c9" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 R   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "FK_5024af4540ba1c3ef2f0bb025c9";
       public          postgres    false    3307    227    229                       2606    17319 )   GigManager FK_54d25d1ae4be5fcfaf3d0dc611c    FK CONSTRAINT     �   ALTER TABLE ONLY public."GigManager"
    ADD CONSTRAINT "FK_54d25d1ae4be5fcfaf3d0dc611c" FOREIGN KEY ("gigId") REFERENCES public."Gig"(id);
 W   ALTER TABLE ONLY public."GigManager" DROP CONSTRAINT "FK_54d25d1ae4be5fcfaf3d0dc611c";
       public          postgres    false    3289    221    220                       2606    17457 /   OrderProductsMap FK_5d0b3a005a8cd822e9f3c3e5d6b    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderProductsMap"
    ADD CONSTRAINT "FK_5d0b3a005a8cd822e9f3c3e5d6b" FOREIGN KEY ("productDetailsId") REFERENCES public."ProductDetails"(id);
 ]   ALTER TABLE ONLY public."OrderProductsMap" DROP CONSTRAINT "FK_5d0b3a005a8cd822e9f3c3e5d6b";
       public          postgres    false    230    223    3293                       2606    17364 -   ProductDetails FK_7e77e317f58c2644fd85272082c    FK CONSTRAINT     �   ALTER TABLE ONLY public."ProductDetails"
    ADD CONSTRAINT "FK_7e77e317f58c2644fd85272082c" FOREIGN KEY ("colorId") REFERENCES public."Color"(id);
 [   ALTER TABLE ONLY public."ProductDetails" DROP CONSTRAINT "FK_7e77e317f58c2644fd85272082c";
       public          postgres    false    223    224    3295                       2606    17442 $   Order FK_88c7d32f6df5d82ae9d4e99a790    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "FK_88c7d32f6df5d82ae9d4e99a790" FOREIGN KEY ("gigId") REFERENCES public."Gig"(id);
 R   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "FK_88c7d32f6df5d82ae9d4e99a790";
       public          postgres    false    229    3289    221                        2606    17304 &   Product FK_896e2e0f6dfa6f80117a79e1d7e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "FK_896e2e0f6dfa6f80117a79e1d7e" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id);
 T   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "FK_896e2e0f6dfa6f80117a79e1d7e";
       public          postgres    false    216    3265    219                       2606    17324 )   GigManager FK_934e94bd485bdf5715484931c71    FK CONSTRAINT     �   ALTER TABLE ONLY public."GigManager"
    ADD CONSTRAINT "FK_934e94bd485bdf5715484931c71" FOREIGN KEY ("gigManagerId") REFERENCES public."Login"(id);
 W   ALTER TABLE ONLY public."GigManager" DROP CONSTRAINT "FK_934e94bd485bdf5715484931c71";
       public          postgres    false    227    3307    220                       2606    17394 #   Size FK_969cff5180a311a71e04229b04a    FK CONSTRAINT     �   ALTER TABLE ONLY public."Size"
    ADD CONSTRAINT "FK_969cff5180a311a71e04229b04a" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 Q   ALTER TABLE ONLY public."Size" DROP CONSTRAINT "FK_969cff5180a311a71e04229b04a";
       public          postgres    false    228    3307    227            �           2606    17294 #   Band FK_bb7b18a3249958c852ec2a2265c    FK CONSTRAINT     �   ALTER TABLE ONLY public."Band"
    ADD CONSTRAINT "FK_bb7b18a3249958c852ec2a2265c" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 Q   ALTER TABLE ONLY public."Band" DROP CONSTRAINT "FK_bb7b18a3249958c852ec2a2265c";
       public          postgres    false    3307    227    218                       2606    17452 /   OrderProductsMap FK_bf9f987c7050f5d423a6d052674    FK CONSTRAINT     �   ALTER TABLE ONLY public."OrderProductsMap"
    ADD CONSTRAINT "FK_bf9f987c7050f5d423a6d052674" FOREIGN KEY ("orderId") REFERENCES public."Order"(id);
 ]   ALTER TABLE ONLY public."OrderProductsMap" DROP CONSTRAINT "FK_bf9f987c7050f5d423a6d052674";
       public          postgres    false    3317    230    229            	           2606    17379 $   Color FK_c29169027b949471e49703fee5e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "FK_c29169027b949471e49703fee5e" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 R   ALTER TABLE ONLY public."Color" DROP CONSTRAINT "FK_c29169027b949471e49703fee5e";
       public          postgres    false    224    3307    227                       2606    17334 '   Customer FK_d94eacaf61fd29dece1baf523c2    FK CONSTRAINT     �   ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "FK_d94eacaf61fd29dece1baf523c2" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 U   ALTER TABLE ONLY public."Customer" DROP CONSTRAINT "FK_d94eacaf61fd29dece1baf523c2";
       public          postgres    false    227    3307    222                       2606    17329 "   Gig FK_e00f518ced00e8623355ed9e348    FK CONSTRAINT     �   ALTER TABLE ONLY public."Gig"
    ADD CONSTRAINT "FK_e00f518ced00e8623355ed9e348" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 P   ALTER TABLE ONLY public."Gig" DROP CONSTRAINT "FK_e00f518ced00e8623355ed9e348";
       public          postgres    false    227    221    3307            �           2606    17269 #   User FK_f22e0f7497ecf29ebc8d6c807d3    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "FK_f22e0f7497ecf29ebc8d6c807d3" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 Q   ALTER TABLE ONLY public."User" DROP CONSTRAINT "FK_f22e0f7497ecf29ebc8d6c807d3";
       public          postgres    false    215    3307    227                       2606    17314 )   GigManager FK_fd117fe8d330fae5e1546464355    FK CONSTRAINT     �   ALTER TABLE ONLY public."GigManager"
    ADD CONSTRAINT "FK_fd117fe8d330fae5e1546464355" FOREIGN KEY ("loginId") REFERENCES public."Login"(id);
 W   ALTER TABLE ONLY public."GigManager" DROP CONSTRAINT "FK_fd117fe8d330fae5e1546464355";
       public          postgres    false    227    3307    220            �   p   x�e�1�0 ��/Fvl�0� ~����b�J�/*U���-�s67�
��⎰
 j�F�BU�|�����x�iY ��'B�^��+�pHTEAI:wUƩ����v?�_nC��+k$      �   Y   x�%˱�@�X��y�9��u�D�	���n�5��PZ�UDTM���3-���8 kDD�+��v-� ����okw�w�F����k�� S�/      �   �   x�UˡB1@Q���@��ֵ��AA��tk0��?`����Ōb!��2��-�0�����N�3d.r���P��q�Jz��Ko�kN7����I�1���$V��_-́6}�L�����|��:����-#�5�n�B��⽰ϑN���៭��e��):�      �   �   x�]��N1D��olmd�v�m�OH444q� �D����]�L1r�g�P��RA�w�Q&PU$�N��<"�10��h�i#-��[�Z��f(��[��~����H;Y���Z�	��$�-��ü�)N���ݾޖ`.�Y���0����v����U|��E����ύ��߀�<�e�Y�y^�����(3�����9�۶�ߊO<      �   �   x�]�9n1@�Z��������4�	�d�d�*q�ˇ?(�f�B���
X�:��֦���L�^������u�u=���aHA$'�ѝπ�1�2�K�[b1�Pp0��殬���>�>���$bј���KL5*��q@n��Ƶ��G-�������?/~r/���{�НA�      �   �   x�U�=
1�zs�O&��_)[X�6�L"�l!���=�{�Z�4+f�	YQ���c-�w��m��r`�w˛X�	�$�t^�`Mr��[�C������d�b3�/�"Z�T?���&������4A-b      �   �   x�U̻
�@��:�y����f/���H����:��4y#�h��9|%璲8`�NCr@�E��$ٖʢm P���j7ݴ>΋S��x�s����> ��Ĭ*
��q����b������@������:/�����7Ƙ�",w      �   U   x�M˱�0����}�y	�6 ���^��+L��R�^�%�*�Y�}��\ ">:�-r�Y���&od���-C�?��c���a      �   �  x����r�0�x�.��-Y�e��-�s3!��F�e[�;��/ICZ��N#����s$����5!c�2nL~��M6a�cr҅��ՙ&��so<n����a��z&,_d����FD� Vq�r�=��Qʌ�� �~>V�.�@D��
��"G�5��Hcf(4f�����l���&�,Q�4����mWܨ�����3M&��Қ�˴�!#�J��Q�4Lڧ����)_Ǳ�J�Vqy��;�M	���Ki���9���rLٰ�D��ڤ�Mr�`ogJO;�#r��m�h�����LV]ߖm��AI5I��Y&a�Q�Y��6u#���w�\�Gɕzpi��r�x}�l�{�ѩK�5�N���U�j��8;G]ɒ�q�\|�_n��*>R�=F|7�t_�|ltN�g�,��^u�.�$�&Q:Pacw���8t3���F����!-�/�j��m��b��U��:����(�]��/���l�������F��;t�G�uS_��F���f���y!�ǋ4BA�}+wݠ�����{+�E/~��c������:[a>M�i�=%�~%��ʾ���e����3�3et����!X���jq?l��C�>�zh���]w�b<���_��ʴ8�.`�:��K]@�BI���rͲ��q�"a
�qhI��Co�Z?:�w�      �   t   x���1����5 `%�����GU�����ܨM$�^���{��p�E ��_��W�p��29�}�7�F�و[\#�zI�g/�\����,3�ֶ�Q��Z�e�#�      �   `   x���!�����A���2@�?��J�Z���u�/��"f��aC����dHRC���_����k�QYSBx4����ޮ�3Ϝ�)q�      �   �   x���=jC1�Z������V�S�B��%��3&�'"�+wS���9��h]\�A&Uc�"����s^޿��Ia�^��Rc�1ׄRu���b'a��9���\��&CnN��]��C^��`�zXi�yC��]�S��U��{��c���k��[��b3F�,mh�c��z�V�ry���r�G      �   �   x��=
B1 �=Ż@�I�������K�6(
�����g��x2���
�.D`^>4�1CO����|}�����/)畕��X���u8���u��c�/�@��S�ѡsa��B*E�s����5�����J����c�rK-�      �   ^   x�]˱1���嘳^�V|��m��/H�w��[�΀f&�ILݎ�\٬�ʹ�u��y�]���Ltf���]a����G���E/���~����      �      x������ � �      �   w   x�U�1�0 g�ّ+;I!f+[A]�Y�`hm����8�t���S���
&cFɩ�4�іS�pV�ǥ�v.��v���z�'"B�UO��
�a]�������i����K�� ;!�     