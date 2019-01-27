import * as React from "react";

import "./Emblems.scss";
import {homepageUrl} from "shared/components/homepage/HomepageRoute";
import {Link} from "react-router-dom";

export const LogoSquare = () => (
  <h1 className="logo-link">
    <Link to={homepageUrl}>
    <svg viewBox="0 0 131 23" version="1.1">
      <title>CrystalBall</title>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group-2" transform="translate(-1.000000, -6.000000)" fill="#fff">
          <path d="M1.2985,6.6585 L4.8265,6.6585 L4.8265,23 L1.2985,23 L1.2985,6.6585 Z M13.7534091,21.922 C13.3614071,22.3793356 12.8673287,22.7304988 12.2711591,22.9755 C11.6749894,23.2205012 11.0094127,23.343 10.2744091,23.343 C9.86607368,23.343 9.43732796,23.2858339 8.98815905,23.1715 C8.53899014,23.0571661 8.1224943,22.8652513 7.73865905,22.59575 C7.3548238,22.3262487 7.03632698,21.9628356 6.78315905,21.5055 C6.52999112,21.0481644 6.40340905,20.4765034 6.40340905,19.7905 C6.40340905,19.12083 6.5381577,18.5246693 6.80765905,18.002 C7.0771604,17.4793307 7.44874002,17.0424184 7.92240905,16.69125 C8.39607809,16.3400816 8.95548916,16.0746676 9.60065905,15.895 C10.2458289,15.7153324 10.944072,15.6255 11.6954091,15.6255 C12.1037444,15.6255 12.516157,15.6336666 12.9326591,15.65 C13.3491611,15.6663334 13.6227417,15.6908332 13.7534091,15.7235 L13.7534091,15.4785 C13.7534091,15.1844985 13.6921597,14.9354177 13.5696591,14.73125 C13.4471584,14.5270823 13.2838267,14.355584 13.0796591,14.21675 C12.8754914,14.077916 12.6427437,13.979917 12.3814091,13.92275 C12.1200744,13.865583 11.8424105,13.837 11.5484091,13.837 C10.7644051,13.837 10.1151616,13.934999 9.60065905,14.131 C9.08615648,14.327001 8.64924418,14.5474988 8.28990905,14.7925 L6.84440905,12.6365 C7.08941028,12.4568324 7.36707417,12.2771676 7.67740905,12.0975 C7.98774394,11.9178324 8.35524026,11.7545007 8.77990905,11.6075 C9.20457784,11.4604993 9.68232306,11.3420838 10.2131591,11.25225 C10.743995,11.1624162 11.3524056,11.1175 12.0384091,11.1175 C13.7860845,11.1175 15.0764049,11.5870786 15.9094091,12.52625 C16.7424132,13.4654214 17.1589091,14.7271587 17.1589091,16.3115 L17.1589091,23 L13.8514091,23 L13.7534091,21.922 Z M13.7534091,17.9285 C13.671742,17.9121666 13.5165769,17.8917501 13.2879091,17.86725 C13.0592412,17.8427499 12.7979105,17.8305 12.5039091,17.8305 C11.5239042,17.8305 10.8297444,17.9693319 10.4214091,18.247 C10.0130737,18.5246681 9.80890905,18.9166641 9.80890905,19.423 C9.80890905,20.3703381 10.38057,20.844 11.5239091,20.844 C11.8015771,20.844 12.0751577,20.7990838 12.3446591,20.70925 C12.6141604,20.6194162 12.8509914,20.4928342 13.0551591,20.3295 C13.2593267,20.1661658 13.4267417,19.9620012 13.5574091,19.717 C13.6880764,19.4719988 13.7534091,19.1861683 13.7534091,18.8595 L13.7534091,17.9285 Z M19.3728181,11.5095 L22.7538181,11.5095 C22.7864849,11.7218344 22.8109847,11.9300823 22.8273181,12.13425 C22.8436515,12.3384177 22.8599847,12.5466656 22.8763181,12.759 C23.2519866,12.285331 23.7338152,11.9219179 24.3218181,11.66875 C24.909821,11.4155821 25.5223149,11.289 26.1593181,11.289 C26.9923223,11.289 27.7273149,11.4523317 28.3643181,11.779 C29.0013213,12.1056683 29.5321493,12.5425806 29.9568181,13.08975 C30.3814869,13.6369194 30.6999837,14.2657464 30.9123181,14.97625 C31.1246525,15.6867536 31.2308181,16.4176629 31.2308181,17.169 C31.2308181,18.230672 31.0511532,19.1534961 30.6918181,19.9375 C30.332483,20.7215039 29.8669876,21.3666641 29.2953181,21.873 C28.7236486,22.3793359 28.0784884,22.7549988 27.3598181,23 C26.6411478,23.2450012 25.9306549,23.3675 25.2283181,23.3675 C24.672982,23.3675 24.2156532,23.3185005 23.8563181,23.2205 C23.496983,23.1224995 23.1703196,23.0245005 22.8763181,22.9265 L22.8763181,27.9 L19.3728181,27.9 L19.3728181,11.5095 Z M22.8763181,19.962 C23.3336537,20.2723349 24.0114803,20.4275 24.9098181,20.4275 C25.7754891,20.4275 26.4573989,20.1375862 26.9555681,19.55775 C27.4537373,18.9779138 27.7028181,18.2061715 27.7028181,17.2425 C27.7028181,16.8668315 27.6579019,16.4993351 27.5680681,16.14 C27.4782343,15.7806649 27.3394024,15.4662513 27.1515681,15.19675 C26.9637338,14.9272487 26.7187363,14.7108342 26.4165681,14.5475 C26.1143999,14.3841659 25.7428203,14.3025 25.3018181,14.3025 C24.9098161,14.3025 24.5627363,14.3759993 24.2605681,14.523 C23.9583999,14.6700007 23.7052358,14.8659988 23.5010681,15.111 C23.2969004,15.3560012 23.1417353,15.6336651 23.0355681,15.944 C22.9294009,16.2543349 22.8763181,16.5728317 22.8763181,16.8995 L22.8763181,19.962 Z M33.8612272,14.278 L32.0482272,14.278 L32.0482272,11.5095 L33.8612272,11.5095 L33.8612272,8.0305 L37.3892272,8.0305 L37.3892272,11.5095 L40.3537272,11.5095 L40.3537272,14.278 L37.3892272,14.278 L37.3892272,18.8105 C37.3892272,19.3658361 37.4994761,19.7945818 37.7199772,20.09675 C37.9404783,20.3989182 38.2875581,20.55 38.7612272,20.55 C39.1205623,20.55 39.4308925,20.4887506 39.6922272,20.36625 C39.9535618,20.2437494 40.1985593,20.1008342 40.4272272,19.9375 L41.8482272,22.0935 C40.7375549,22.9755044 39.5289004,23.4165 38.2222272,23.4165 C37.4055564,23.4165 36.7195633,23.2980845 36.1642272,23.06125 C35.608891,22.8244155 35.1597289,22.4977521 34.8167272,22.08125 C34.4737254,21.6647479 34.2287279,21.1625029 34.0817272,20.5745 C33.9347264,19.9864971 33.8612272,19.3331703 33.8612272,18.6145 L33.8612272,14.278 Z M48.0066362,20.3295 C48.4476384,20.3295 48.8396345,20.2437509 49.1826362,20.07225 C49.5256379,19.9007491 49.8155517,19.6680015 50.0523862,19.374 C50.2892207,19.0799985 50.4648023,18.7492518 50.5791362,18.38175 C50.6934701,18.0142482 50.7506362,17.634502 50.7506362,17.2425 C50.7506362,16.850498 50.6934701,16.4707518 50.5791362,16.10325 C50.4648023,15.7357482 50.2892207,15.4090848 50.0523862,15.12325 C49.8155517,14.8374152 49.5256379,14.6087509 49.1826362,14.43725 C48.8396345,14.2657491 48.4476384,14.18 48.0066362,14.18 C47.565634,14.18 47.1695546,14.2657491 46.8183862,14.43725 C46.4672178,14.6087509 46.177304,14.8374152 45.9486362,15.12325 C45.7199684,15.4090848 45.5443868,15.7357482 45.4218862,16.10325 C45.2993856,16.4707518 45.2381362,16.850498 45.2381362,17.2425 C45.2381362,17.634502 45.2993856,18.0142482 45.4218862,18.38175 C45.5443868,18.7492518 45.7199684,19.0799985 45.9486362,19.374 C46.177304,19.6680015 46.4672178,19.9007491 46.8183862,20.07225 C47.1695546,20.2437509 47.565634,20.3295 48.0066362,20.3295 Z M41.8326362,17.2425 C41.8326362,16.3931624 41.983718,15.5969204 42.2858862,14.85375 C42.5880544,14.1105796 43.0086335,13.4613361 43.5476362,12.906 C44.0866389,12.3506639 44.7358824,11.9137516 45.4953862,11.59525 C46.25489,11.2767484 47.091965,11.1175 48.0066362,11.1175 C48.9213074,11.1175 49.7542991,11.2767484 50.5056362,11.59525 C51.2569733,11.9137516 51.9021335,12.3506639 52.4411362,12.906 C52.9801389,13.4613361 53.400718,14.1105796 53.7028862,14.85375 C54.0050544,15.5969204 54.1561362,16.3931624 54.1561362,17.2425 C54.1561362,18.0918376 54.0050544,18.8880796 53.7028862,19.63125 C53.400718,20.3744204 52.9801389,21.0236639 52.4411362,21.579 C51.9021335,22.1343361 51.2569733,22.5753317 50.5056362,22.902 C49.7542991,23.2286683 48.9213074,23.392 48.0066362,23.392 C47.091965,23.392 46.25489,23.2286683 45.4953862,22.902 C44.7358824,22.5753317 44.0866389,22.1343361 43.5476362,21.579 C43.0086335,21.0236639 42.5880544,20.3744204 42.2858862,19.63125 C41.983718,18.8880796 41.8326362,18.0918376 41.8326362,17.2425 Z M55.9290453,11.5095 L59.3100453,11.5095 C59.3427121,11.7218344 59.3672118,11.9300823 59.3835453,12.13425 C59.3998787,12.3384177 59.4162118,12.5466656 59.4325453,12.759 C59.8082138,12.285331 60.2900423,11.9219179 60.8780453,11.66875 C61.4660482,11.4155821 62.0785421,11.289 62.7155453,11.289 C63.5485494,11.289 64.2835421,11.4523317 64.9205453,11.779 C65.5575484,12.1056683 66.0883765,12.5425806 66.5130453,13.08975 C66.937714,13.6369194 67.2562109,14.2657464 67.4685453,14.97625 C67.6808797,15.6867536 67.7870453,16.4176629 67.7870453,17.169 C67.7870453,18.230672 67.6073804,19.1534961 67.2480453,19.9375 C66.8887101,20.7215039 66.4232148,21.3666641 65.8515453,21.873 C65.2798757,22.3793359 64.6347155,22.7549988 63.9160453,23 C63.197375,23.2450012 62.4868821,23.3675 61.7845453,23.3675 C61.2292091,23.3675 60.7718804,23.3185005 60.4125453,23.2205 C60.0532101,23.1224995 59.7265467,23.0245005 59.4325453,22.9265 L59.4325453,27.9 L55.9290453,27.9 L55.9290453,11.5095 Z M59.4325453,19.962 C59.8898809,20.2723349 60.5677074,20.4275 61.4660453,20.4275 C62.3317163,20.4275 63.0136261,20.1375862 63.5117953,19.55775 C64.0099644,18.9779138 64.2590453,18.2061715 64.2590453,17.2425 C64.2590453,16.8668315 64.214129,16.4993351 64.1242953,16.14 C64.0344615,15.7806649 63.8956295,15.4662513 63.7077953,15.19675 C63.519961,14.9272487 63.2749634,14.7108342 62.9727953,14.5475 C62.6706271,14.3841659 62.2990475,14.3025 61.8580453,14.3025 C61.4660433,14.3025 61.1189634,14.3759993 60.8167953,14.523 C60.5146271,14.6700007 60.2614629,14.8659988 60.0572953,15.111 C59.8531276,15.3560012 59.6979625,15.6336651 59.5917953,15.944 C59.4856281,16.2543349 59.4325453,16.5728317 59.4325453,16.8995 L59.4325453,19.962 Z M71.4464543,24.47 C71.9037899,24.7476681 72.3897017,24.9640826 72.9042043,25.11925 C73.4187069,25.2744174 73.9862845,25.352 74.6069543,25.352 C75.4072916,25.352 76.0361187,25.1396688 76.4934543,24.715 C76.9507899,24.2903312 77.1794543,23.6533376 77.1794543,22.804 L77.1794543,21.9955 C76.4444506,22.6325032 75.4644604,22.951 74.2394543,22.951 C73.4227836,22.951 72.6918742,22.8162513 72.0467043,22.54675 C71.4015344,22.2772487 70.8584565,21.8975025 70.4174543,21.4075 C69.9764521,20.9174976 69.6375388,20.33767 69.4007043,19.668 C69.1638698,18.99833 69.0454543,18.2633373 69.0454543,17.463 C69.0454543,16.5319953 69.2047027,15.6867538 69.5232043,14.92725 C69.8417059,14.1677462 70.2908681,13.5144194 70.8707043,12.96725 C71.4505405,12.4200806 72.1447003,11.9995015 72.9532043,11.7055 C73.7617084,11.4114985 74.664116,11.2645 75.6604543,11.2645 C76.6077924,11.2645 77.5102,11.3461658 78.3677043,11.5095 C79.2252086,11.6728341 79.9969509,11.8769988 80.6829543,12.122 L80.6829543,22.6325 C80.6829543,24.5271761 80.1602929,25.9277455 79.1149543,26.83425 C78.0696158,27.7407545 76.6404634,28.194 74.8274543,28.194 C73.7984492,28.194 72.9001248,28.096001 72.1324543,27.9 C71.3647838,27.703999 70.6624575,27.3936688 70.0254543,26.969 L71.4464543,24.47 Z M77.2039543,14.425 C76.9752865,14.3433329 76.7466221,14.2820835 76.5179543,14.24125 C76.2892865,14.2004165 75.9871229,14.18 75.6114543,14.18 C75.1051184,14.18 74.6641229,14.2657491 74.2884543,14.43725 C73.9127858,14.6087509 73.5983722,14.8374152 73.3452043,15.12325 C73.0920364,15.4090848 72.9042049,15.7439147 72.7817043,16.12775 C72.6592037,16.5115853 72.5979543,16.9158312 72.5979543,17.3405 C72.5979543,18.1735042 72.7980356,18.8349976 73.1982043,19.325 C73.598373,19.8150025 74.1822838,20.06 74.9499543,20.06 C75.6686246,20.06 76.2239524,19.8844184 76.6159543,19.53325 C77.0079563,19.1820816 77.2039543,18.6308371 77.2039543,17.8795 L77.2039543,14.425 Z M93.8238634,21.7505 C93.693196,21.8321671 93.497198,21.9669157 93.2358634,22.15475 C92.9745287,22.3425843 92.6356154,22.5263324 92.2191134,22.706 C91.8026113,22.8856676 91.3085329,23.044916 90.7368634,23.18375 C90.1651938,23.322584 89.511867,23.392 88.7768634,23.392 C87.7968585,23.392 86.9148673,23.2409182 86.1308634,22.93875 C85.3468594,22.6365818 84.6812828,22.2160027 84.1341134,21.677 C83.586944,21.1379973 83.1704481,20.4887538 82.8846134,19.72925 C82.5987786,18.9697462 82.4558634,18.1326712 82.4558634,17.218 C82.4558634,16.4176627 82.590612,15.6459204 82.8601134,14.90275 C83.1296147,14.1595796 83.5175275,13.5103361 84.0238634,12.955 C84.5301992,12.3996639 85.1508597,11.954585 85.8858634,11.61975 C86.620867,11.284915 87.4538587,11.1175 88.3848634,11.1175 C89.315868,11.1175 90.1325265,11.2808317 90.8348634,11.6075 C91.5372002,11.9341683 92.1292776,12.3874138 92.6111134,12.96725 C93.0929491,13.5470862 93.4563621,14.241246 93.7013634,15.04975 C93.9463646,15.858254 94.0688634,16.7443285 94.0688634,17.708 L94.0688634,18.296 L85.8858634,18.296 C85.9021968,18.9166698 86.1757774,19.4597477 86.7066134,19.92525 C87.2374494,20.3907523 87.9683587,20.6235 88.8993634,20.6235 C89.8140346,20.6235 90.5571938,20.4887513 91.1288634,20.21925 C91.7005329,19.9497487 92.1170287,19.717001 92.3783634,19.521 L93.8238634,21.7505 Z M90.7368634,16.042 C90.7368634,15.7969988 90.6878639,15.5479179 90.5898634,15.29475 C90.4918629,15.0415821 90.3448643,14.8088344 90.1488634,14.5965 C89.9528624,14.3841656 89.7078648,14.208584 89.4138634,14.06975 C89.1198619,13.930916 88.7686987,13.8615 88.3603634,13.8615 C87.952028,13.8615 87.5926982,13.930916 87.2823634,14.06975 C86.9720285,14.208584 86.7147811,14.3841656 86.5106134,14.5965 C86.3064457,14.8088344 86.1512806,15.0415821 86.0451134,15.29475 C85.9389462,15.5479179 85.8858634,15.7969988 85.8858634,16.042 L90.7368634,16.042 Z M106.597272,21.7505 C106.466605,21.8321671 106.270607,21.9669157 106.009272,22.15475 C105.747938,22.3425843 105.409024,22.5263324 104.992522,22.706 C104.57602,22.8856676 104.081942,23.044916 103.510272,23.18375 C102.938603,23.322584 102.285276,23.392 101.550272,23.392 C100.570268,23.392 99.6882763,23.2409182 98.9042724,22.93875 C98.1202685,22.6365818 97.4546918,22.2160027 96.9075224,21.677 C96.360353,21.1379973 95.9438572,20.4887538 95.6580224,19.72925 C95.3721877,18.9697462 95.2292724,18.1326712 95.2292724,17.218 C95.2292724,16.4176627 95.3640211,15.6459204 95.6335224,14.90275 C95.9030238,14.1595796 96.2909366,13.5103361 96.7972724,12.955 C97.3036083,12.3996639 97.9242687,11.954585 98.6592724,11.61975 C99.3942761,11.284915 100.227268,11.1175 101.158272,11.1175 C102.089277,11.1175 102.905936,11.2808317 103.608272,11.6075 C104.310609,11.9341683 104.902687,12.3874138 105.384522,12.96725 C105.866358,13.5470862 106.229771,14.241246 106.474772,15.04975 C106.719774,15.858254 106.842272,16.7443285 106.842272,17.708 L106.842272,18.296 L98.6592724,18.296 C98.6756058,18.9166698 98.9491864,19.4597477 99.4800224,19.92525 C100.010858,20.3907523 100.741768,20.6235 101.672772,20.6235 C102.587444,20.6235 103.330603,20.4887513 103.902272,20.21925 C104.473942,19.9497487 104.890438,19.717001 105.151772,19.521 L106.597272,21.7505 Z M103.510272,16.042 C103.510272,15.7969988 103.461273,15.5479179 103.363272,15.29475 C103.265272,15.0415821 103.118273,14.8088344 102.922272,14.5965 C102.726271,14.3841656 102.481274,14.208584 102.187272,14.06975 C101.893271,13.930916 101.542108,13.8615 101.133772,13.8615 C100.725437,13.8615 100.366107,13.930916 100.055772,14.06975 C99.7454375,14.208584 99.4881901,14.3841656 99.2840224,14.5965 C99.0798547,14.8088344 98.9246896,15.0415821 98.8185224,15.29475 C98.7123552,15.5479179 98.6592724,15.7969988 98.6592724,16.042 L103.510272,16.042 Z M108.517181,6.6585 L112.045181,6.6585 L112.045181,15.1355 L115.548681,11.5095 L119.542181,11.5095 L115.426181,15.748 L120.105681,23 L116.014181,23 L113.074181,18.149 L112.045181,19.2025 L112.045181,23 L108.517181,23 L108.517181,6.6585 Z" id="laptopgeek" />
          <path d="M122.0145,7.461 L120.1785,7.461 L120.1785,6.3305 L125.134,6.3305 L125.134,7.461 L123.3065,7.461 L123.3065,12 L122.0145,12 L122.0145,7.461 Z M125.834091,6.3305 L127.049591,6.3305 L128.528591,8.991 L129.973591,6.3305 L131.197591,6.3305 L131.461091,12 L130.177591,12 L130.016091,8.294 L128.843091,10.504 L128.180091,10.504 L126.939091,8.3195 L126.794591,12 L125.570591,12 L125.834091,6.3305 Z" id="TM" />
        </g>
      </g>
    </svg>
    </Link>
  </h1>
);
