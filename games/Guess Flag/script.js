const cars = [
    {
        brand: "Afghanistan",
        logo: "https://flagpedia.net/data/flags/w1160/af.webp?v=un"
    },
    {
        brand: "Albania",
        logo: "https://flagpedia.net/data/flags/w1160/al.webp"
    },
    {
        brand: "Algeria",
        logo: "https://flagpedia.net/data/flags/w1160/dz.webp"
    },
    {
        brand: "Angola",
        logo: "https://flagpedia.net/data/flags/w1160/ao.webp"
    },
    {
        brand: "Burundi",
        logo: "https://flagpedia.net/data/flags/w1160/bi.webp"
    },
    {
        brand: "Burkina Faso",
        logo: "https://flagpedia.net/data/flags/w1160/bf.webp"
    },
    {
        brand: "Bulgaria",
        logo: "https://flagpedia.net/data/flags/w1160/bg.webp"
    },
    {
        brand: "Brunei",
        logo: "https://flagpedia.net/data/flags/w1160/bn.webp"
    },
    {
        brand: "Brazil",
        logo: "https://flagpedia.net/data/flags/w1160/br.webp"
    },
    {
        brand: "Botswana",
        logo: "https://flagpedia.net/data/flags/w1160/bw.webp"
    },
    {
        brand: "Bosnia and Herzegovina",
        logo: "https://flagpedia.net/data/flags/w1160/ba.webp"
    },
    {
        brand: "Bolivia",
        logo: "https://flagpedia.net/data/flags/w1160/bo.webp"
    },
    {
        brand: "Bhutan",
        logo: "https://flagpedia.net/data/flags/w1160/bt.webp"
    },
    {
        brand: "Benin",
        logo: "https://flagpedia.net/data/flags/w1160/bj.webp"
    },
    {
        brand: "Belgium",
        logo: "https://flagpedia.net/data/flags/w1160/be.webp"
    },
    {
        brand: "Bangladesh",
        logo: "https://flagpedia.net/data/flags/w1160/bd.webp"
    },
    {
        brand: "Bahrain",
        logo: "https://flagpedia.net/data/flags/w1160/bh.webp"
    },
    {
        brand: "Bahamas",
        logo: "https://flagpedia.net/data/flags/w1160/bs.webp"
    },
    {
        brand: "Azerbaijan",
        logo: "https://flagpedia.net/data/flags/w1160/az.webp"
    },
    {
        brand: "Austria",
        logo: "https://flagpedia.net/data/flags/w1160/at.webp"
    },
    {
        brand: "Australia",
        logo: "https://flagpedia.net/data/flags/w1160/au.webp"
    }, {
        brand: "Cambodia",
        logo: "https://flagpedia.net/data/flags/w1160/kh.webp"
    },
    {
        brand: "Cameroon",
        logo: "https://flagpedia.net/data/flags/w1160/cm.webp"
    },
    {
        brand: "Canada",
        logo: "https://flagpedia.net/data/flags/w1160/ca.webp"
    },
    {
        brand: "Cape Verde",
        logo: "https://flagpedia.net/data/flags/w1160/cv.webp"
    },
    // {
    //     brand: "Caribbean Netherlands",
    //     logo: "https://flagpedia.net/data/flags/w1160/bq.webp"
    // },
    // {
    //     brand: "Cayman Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/ky.webp"
    // },
    // {
    //     brand: "Central African Republic",
    //     logo: "https://flagpedia.net/data/flags/w1160/cf.webp"
    // },
    {
        brand: "Chad",
        logo: "https://flagpedia.net/data/flags/w1160/td.webp"
    },
    {
        brand: "Chile",
        logo: "https://flagpedia.net/data/flags/w1160/cl.webp"
    },
    {
        brand: "China",
        logo: "https://flagpedia.net/data/flags/w1160/cn.webp"
    },
    // {
    //     brand: "Christmas Island",
    //     logo: "https://flagpedia.net/data/flags/w1160/cx.webp"
    // },
    // {
    //     brand: "Cocos Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/cc.webp"
    // },
    {
        brand: "Colombia",
        logo: "https://flagpedia.net/data/flags/w1160/co.webp"
    },
    {
        brand: "Comoros",
        logo: "https://flagpedia.net/data/flags/w1160/km.webp"
    },
    // {
    //     brand: "Republic of the Congo",
    //     logo: "https://flagpedia.net/data/flags/w1160/cg.webp"
    // },
    {
        brand: "DR Congo",
        logo: "https://flagpedia.net/data/flags/w1160/cd.webp"
    },
    {
        brand: "Cook Islands",
        logo: "https://flagpedia.net/data/flags/w1160/ck.webp"
    },
    {
        brand: "Costa Rica",
        logo: "https://flagpedia.net/data/flags/w1160/cr.webp"
    },
    {
        brand: "Côte d'Ivoire",
        logo: "https://flagpedia.net/data/flags/w1160/ci.webp"
    },
    {
        brand: "Croatia",
        logo: "https://flagpedia.net/data/flags/w1160/hr.webp"
    },
    {
        brand: "Cuba",
        logo: "https://flagpedia.net/data/flags/w1160/cu.webp"
    },
    {
        brand: "Curaçao",
        logo: "https://flagpedia.net/data/flags/w1160/cw.webp"
    },
    {
        brand: "Cyprus",
        logo: "https://flagpedia.net/data/flags/w1160/cy.webp"
    },
    {
        brand: "Czechia",
        logo: "https://flagpedia.net/data/flags/w1160/cz.webp"
    },
    {
        brand: "Denmark",
        logo: "https://flagpedia.net/data/flags/w1160/dk.webp"
    },
    {
        brand: "Djibouti",
        logo: "https://flagpedia.net/data/flags/w1160/dj.webp"
    },
    // {
    //     brand: "Dominica",
    //     logo: "https://flagpedia.net/data/flags/w1160/dm.webp"
    // },
    // {
    //     brand: "Dominican Republic",
    //     logo: "https://flagpedia.net/data/flags/w1160/do.webp"
    // },
    {
        brand: "Ecuador",
        logo: "https://flagpedia.net/data/flags/w1160/ec.webp"
    },
    {
        brand: "Egypt",
        logo: "https://flagpedia.net/data/flags/w1160/eg.webp"
    },
    {
        brand: "El Salvador",
        logo: "https://flagpedia.net/data/flags/w1160/sv.webp"
    },
    {
        brand: "England",
        logo: "https://flagpedia.net/data/flags/w1160/gb-eng.webp"
    },
    // {
    //     brand: "Equatorial Guinea",
    //     logo: "https://flagpedia.net/data/flags/w1160/gq.webp"
    // },
    {
        brand: "Eritrea",
        logo: "https://flagpedia.net/data/flags/w1160/er.webp"
    },
    {
        brand: "Estonia",
        logo: "https://flagpedia.net/data/flags/w1160/ee.webp"
    },
    // {
    //     brand: "Eswatini",
    //     logo: "https://flagpedia.net/data/flags/w1160/sz.webp"
    // },
    {
        brand: "Ethiopia",
        logo: "https://flagpedia.net/data/flags/w1160/et.webp"
    },
    // {
    //     brand: "Falkland Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/fk.webp"
    // },
    // {
    //     brand: "Faroe Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/fo.webp"
    // },
    // {
    //     brand: "Fiji",
    //     logo: "https://flagpedia.net/data/flags/w1160/fj.webp"
    // },
    {
        brand: "Finland",
        logo: "https://flagpedia.net/data/flags/w1160/fi.webp"
    },
    {
        brand: "France",
        logo: "https://flagpedia.net/data/flags/w1160/fr.webp"
    },
    // {
    //     brand: "French Guiana",
    //     logo: "https://flagpedia.net/data/flags/w1160/gf.webp"
    // },
    // {
    //     brand: "French Polynesia",
    //     logo: "https://flagpedia.net/data/flags/w1160/pf.webp"
    // },
    // {
    //     brand: "French Southern and Antarctic Lands",
    //     logo: "https://flagpedia.net/data/flags/w1160/tf.webp"
    // },
    {
        brand: "Gabon",
        logo: "https://flagpedia.net/data/flags/w1160/ga.webp"
    },
    // {
    //     brand: "Gambia",
    //     logo: "https://flagpedia.net/data/flags/w1160/gm.webp"
    // },
    {
        brand: "Georgia",
        logo: "https://flagpedia.net/data/flags/w1160/ge.webp"
    },
    {
        brand: "Germany",
        logo: "https://flagpedia.net/data/flags/w1160/de.webp"
    },
    {
        brand: "Ghana",
        logo: "https://flagpedia.net/data/flags/w1160/gh.webp"
    },
    {
        brand: "Gibraltar",
        logo: "https://flagpedia.net/data/flags/w1160/gi.webp"
    },
    {
        brand: "Greece",
        logo: "https://flagpedia.net/data/flags/w1160/gr.webp"
    },
    // {
    //     brand: "Greenland",
    //     logo: "https://flagpedia.net/data/flags/w1160/gl.webp"
    // },
    // {
    //     brand: "Grenada",
    //     logo: "https://flagpedia.net/data/flags/w1160/gd.webp"
    // },
    // {
    //     brand: "Guadeloupe",
    //     logo: "https://flagpedia.net/data/flags/w1160/gp.webp"
    // },
    // {
    //     brand: "Guam",
    //     logo: "https://flagpedia.net/data/flags/w1160/gu.webp"
    // },
    // {
    //     brand: "Guatemala",
    //     logo: "https://flagpedia.net/data/flags/w1160/gt.webp"
    // },
    // {
    //     brand: "Guernsey",
    //     logo: "https://flagpedia.net/data/flags/w1160/gg.webp"
    // },
    {
        brand: "Guinea",
        logo: "https://flagpedia.net/data/flags/w1160/gn.webp"
    },
    {
        brand: "Guinea-Bissau",
        logo: "https://flagpedia.net/data/flags/w1160/gw.webp"
    },
    // {
    //     brand: "Guyana",
    //     logo: "https://flagpedia.net/data/flags/w1160/gy.webp"
    // },
    // {
    //     brand: "Haiti",
    //     logo: "https://flagpedia.net/data/flags/w1160/ht.webp"
    // },
    // {
    //     brand: "Heard Island and McDonald Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/hm.webp"
    // },
    // {
    //     brand: "Honduras",
    //     logo: "https://flagpedia.net/data/flags/w1160/hn.webp"
    // },
    {
        brand: "Hong Kong",
        logo: "https://flagpedia.net/data/flags/w1160/hk.webp"
    },
    {
        brand: "Hungary",
        logo: "https://flagpedia.net/data/flags/w1160/hu.webp"
    },
    {
        brand: "Iceland",
        logo: "https://flagpedia.net/data/flags/w1160/is.webp"
    },
    {
        brand: "India",
        logo: "https://flagpedia.net/data/flags/w1160/in.webp"
    },
    {
        brand: "Indonesia",
        logo: "https://flagpedia.net/data/flags/w1160/id.webp"
    },
    {
        brand: "Iran",
        logo: "https://flagpedia.net/data/flags/w1160/ir.webp"
    },
    {
        brand: "Iraq",
        logo: "https://flagpedia.net/data/flags/w1160/iq.webp"
    },
    {
        brand: "Ireland",
        logo: "https://flagpedia.net/data/flags/w1160/ie.webp"
    },
    // {
    //     brand: "Isle of Man",
    //     logo: "https://flagpedia.net/data/flags/w1160/im.webp"
    // },
    {
        brand: "Italy",
        logo: "https://flagpedia.net/data/flags/w1160/it.webp"
    },
    {
        brand: "Jamaica",
        logo: "https://flagpedia.net/data/flags/w1160/jm.webp"
    },
    {
        brand: "Japan",
        logo: "https://flagpedia.net/data/flags/w1160/jp.webp"
    },
    // {
    //     brand: "Jersey",
    //     logo: "https://flagpedia.net/data/flags/w1160/je.webp"
    // },
    {
        brand: "Jordan",
        logo: "https://flagpedia.net/data/flags/w1160/jo.webp"
    },
    {
        brand: "Kazakhstan",
        logo: "https://flagpedia.net/data/flags/w1160/kz.webp"
    },
    {
        brand: "Kenya",
        logo: "https://flagpedia.net/data/flags/w1160/ke.webp"
    },
    // {
    //     brand: "Kiribati",
    //     logo: "https://flagpedia.net/data/flags/w1160/ki.webp"
    // },
    {
        brand: "North Korea",
        logo: "https://flagpedia.net/data/flags/w1160/kp.webp"
    },
    {
        brand: "South Korea",
        logo: "https://flagpedia.net/data/flags/w1160/kr.webp"
    },
    // {
    //     brand: "Kosovo",
    //     logo: "https://flagpedia.net/data/flags/w1160/xk.webp"
    // },
    {
        brand: "Kuwait",
        logo: "https://flagpedia.net/data/flags/w1160/kw.webp"
    },
    // {
    //     brand: "Kyrgyzstan",
    //     logo: "https://flagpedia.net/data/flags/w1160/kg.webp"
    // },
    // {
    //     brand: "Laos",
    //     logo: "https://flagpedia.net/data/flags/w1160/la.webp"
    // },
    {
        brand: "Latvia",
        logo: "https://flagpedia.net/data/flags/w1160/lv.webp"
    },
    {
        brand: "Lebanon",
        logo: "https://flagpedia.net/data/flags/w1160/lb.webp"
    },
    {
        brand: "Lesotho",
        logo: "https://flagpedia.net/data/flags/w1160/ls.webp"
    },
    {
        brand: "Liberia",
        logo: "https://flagpedia.net/data/flags/w1160/lr.webp"
    },
    {
        brand: "Libya",
        logo: "https://flagpedia.net/data/flags/w1160/ly.webp"
    },
    {
        brand: "Liechtenstein",
        logo: "https://flagpedia.net/data/flags/w1160/li.webp"
    },
    {
        brand: "Lithuania",
        logo: "https://flagpedia.net/data/flags/w1160/lt.webp"
    },
    {
        brand: "Luxembourg",
        logo: "https://flagpedia.net/data/flags/w1160/lu.webp"
    },
    // {
    //     brand: "Macau",
    //     logo: "https://flagpedia.net/data/flags/w1160/mo.webp"
    // },
    {
        brand: "Madagascar",
        logo: "https://flagpedia.net/data/flags/w1160/mg.webp"
    },
    // {
    //     brand: "Malawi",
    //     logo: "https://flagpedia.net/data/flags/w1160/mw.webp"
    // },
    {
        brand: "Malaysia",
        logo: "https://flagpedia.net/data/flags/w1160/my.webp"
    },
    {
        brand: "Maldives",
        logo: "https://flagpedia.net/data/flags/w1160/mv.webp"
    },
    {
        brand: "Mali",
        logo: "https://flagpedia.net/data/flags/w1160/ml.webp"
    },
    {
        brand: "Malta",
        logo: "https://flagpedia.net/data/flags/w1160/mt.webp"
    },
    // {
    //     brand: "Marshall Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/mh.webp"
    // },
    // {
    //     brand: "Martinique",
    //     logo: "https://flagpedia.net/data/flags/w1160/mq.webp"
    // },
    {
        brand: "Mauritania",
        logo: "https://flagpedia.net/data/flags/w1160/mr.webp"
    },
    // {
    //     brand: "Mauritius",
    //     logo: "https://flagpedia.net/data/flags/w1160/mu.webp"
    // },
    // {
    //     brand: "Mayotte",
    //     logo: "https://flagpedia.net/data/flags/w1160/yt.webp"
    // },
    {
        brand: "Mexico",
        logo: "https://flagpedia.net/data/flags/w1160/mx.webp"
    },
    // {
    //     brand: "Micronesia",
    //     logo: "https://flagpedia.net/data/flags/w1160/fm.webp"
    // },
    {
        brand: "Moldova",
        logo: "https://flagpedia.net/data/flags/w1160/md.webp"
    },
    {
        brand: "Monaco",
        logo: "https://flagpedia.net/data/flags/w1160/mc.webp"
    },
    // {
    //     brand: "Mongolia",
    //     logo: "https://flagpedia.net/data/flags/w1160/mn.webp"
    // },
    {
        brand: "Montenegro",
        logo: "https://flagpedia.net/data/flags/w1160/me.webp"
    },
    // {
    //     brand: "Montserrat",
    //     logo: "https://flagpedia.net/data/flags/w1160/ms.webp"
    // },
    {
        brand: "Morocco",
        logo: "https://flagpedia.net/data/flags/w1160/ma.webp"
    },
    {
        brand: "Mozambique",
        logo: "https://flagpedia.net/data/flags/w1160/mz.webp"
    },
    // {
    //     brand: "Myanmar",
    //     logo: "https://flagpedia.net/data/flags/w1160/mm.webp"
    // },
    // {
    //     brand: "Namibia",
    //     logo: "https://flagpedia.net/data/flags/w1160/na.webp"
    // },
    // {
    //     brand: "Nauru",
    //     logo: "https://flagpedia.net/data/flags/w1160/nr.webp"
    // },
    {
        brand: "Nepal",
        logo: "https://flagpedia.net/data/flags/w1160/np.webp"
    },
    {
        brand: "Netherlands",
        logo: "https://flagpedia.net/data/flags/w1160/nl.webp"
    },
    // {
    //     brand: "New Caledonia",
    //     logo: "https://flagpedia.net/data/flags/w1160/nc.webp"
    // },
    {
        brand: "New Zealand",
        logo: "https://flagpedia.net/data/flags/w1160/nz.webp"
    },
    // {
    //     brand: "Nicaragua",
    //     logo: "https://flagpedia.net/data/flags/w1160/ni.webp"
    // },
    {
        brand: "Niger",
        logo: "https://flagpedia.net/data/flags/w1160/ne.webp"
    },
    {
        brand: "Nigeria",
        logo: "https://flagpedia.net/data/flags/w1160/ng.webp"
    },
    // {
    //     brand: "Niue",
    //     logo: "https://flagpedia.net/data/flags/w1160/nu.webp"
    // },
    // {
    //     brand: "Norfolk Island",
    //     logo: "https://flagpedia.net/data/flags/w1160/nf.webp"
    // },
    // {
    //     brand: "North Macedonia",
    //     logo: "https://flagpedia.net/data/flags/w1160/mk.webp"
    // },
    // {
    //     brand: "Northern Ireland",
    //     logo: "https://flagpedia.net/data/flags/w1160/gb-nir.webp"
    // },
    // {
    //     brand: "Northern Mariana Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/mp.webp"
    // },
    {
        brand: "Norway",
        logo: "https://flagpedia.net/data/flags/w1160/no.webp"
    },
    {
        brand: "Oman",
        logo: "https://flagpedia.net/data/flags/w1160/om.webp"
    },
    {
        brand: "Pakistan",
        logo: "https://flagpedia.net/data/flags/w1160/pk.webp"
    },
    // {
    //     brand: "Palau",
    //     logo: "https://flagpedia.net/data/flags/w1160/pw.webp"
    // },
    {
        brand: "Palestine",
        logo: "https://flagpedia.net/data/flags/w1160/ps.webp"
    },
    {
        brand: "Panama",
        logo: "https://flagpedia.net/data/flags/w1160/pa.webp"
    },
    {
        brand: "Papua New Guinea",
        logo: "https://flagpedia.net/data/flags/w1160/pg.webp"
    },
    {
        brand: "Paraguay",
        logo: "https://flagpedia.net/data/flags/w1160/py.webp"
    },
    {
        brand: "Peru",
        logo: "https://flagpedia.net/data/flags/w1160/pe.webp"
    },
    {
        brand: "Philippines",
        logo: "https://flagpedia.net/data/flags/w1160/ph.webp"
    },
    // {
    //     brand: "Pitcairn Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/pn.webp"
    // },
    {
        brand: "Poland",
        logo: "https://flagpedia.net/data/flags/w1160/pl.webp"
    },
    {
        brand: "Portugal",
        logo: "https://flagpedia.net/data/flags/w1160/pt.webp"
    },
    // {
    //     brand: "Puerto Rico",
    //     logo: "https://flagpedia.net/data/flags/w1160/pr.webp"
    // },
    {
        brand: "Qatar",
        logo: "https://flagpedia.net/data/flags/w1160/qa.webp"
    },
    // {
    //     brand: "Réunion",
    //     logo: "https://flagpedia.net/data/flags/w1160/re.webp"
    // },
    {
        brand: "Romania",
        logo: "https://flagpedia.net/data/flags/w1160/ro.webp"
    },
    {
        brand: "Russia",
        logo: "https://flagpedia.net/data/flags/w1160/ru.webp"
    },
    // {
    //     brand: "Rwanda",
    //     logo: "https://flagpedia.net/data/flags/w1160/rw.webp"
    // },
    // {
    //     brand: "Saint Barthélemy",
    //     logo: "https://flagpedia.net/data/flags/w1160/bl.webp"
    // },
    // {
    //     brand: "Saint Helena, Ascension and Tristan da Cunha",
    //     logo: "https://flagpedia.net/data/flags/w1160/sh.webp"
    // },
    // {
    //     brand: "Saint Kitts and Nevis",
    //     logo: "https://flagpedia.net/data/flags/w1160/kn.webp"
    // },
    {
        brand: "Saint Lucia",
        logo: "https://flagpedia.net/data/flags/w1160/lc.webp"
    },
    // {
    //     brand: "Saint Martin",
    //     logo: "https://flagpedia.net/data/flags/w1160/mf.webp"
    // },
    // {
    //     brand: "Saint Pierre and Miquelon",
    //     logo: "https://flagpedia.net/data/flags/w1160/pm.webp"
    // },
    // {
    //     brand: "Saint Vincent and the Grenadines",
    //     logo: "https://flagpedia.net/data/flags/w1160/vc.webp"
    // },
    // {
    //     brand: "Samoa",
    //     logo: "https://flagpedia.net/data/flags/w1160/ws.webp"
    // },
    {
        brand: "San Marino",
        logo: "https://flagpedia.net/data/flags/w1160/sm.webp"
    },
    // {
    //     brand: "São Tomé and Príncipe",
    //     logo: "https://flagpedia.net/data/flags/w1160/st.webp"
    // },
    {
        brand: "Saudi Arabia",
        logo: "https://flagpedia.net/data/flags/w1160/sa.webp"
    },
    {
        brand: "Scotland",
        logo: "https://flagpedia.net/data/flags/w1160/gb-sct.webp"
    },
    {
        brand: "Senegal",
        logo: "https://flagpedia.net/data/flags/w1160/sn.webp"
    },
    {
        brand: "Serbia",
        logo: "https://flagpedia.net/data/flags/w1160/rs.webp"
    },
    {
        brand: "Seychelles",
        logo: "https://flagpedia.net/data/flags/w1160/sc.webp"
    },
    {
        brand: "Sierra Leone",
        logo: "https://flagpedia.net/data/flags/w1160/sl.webp"
    },
    {
        brand: "Singapore",
        logo: "https://flagpedia.net/data/flags/w1160/sg.webp"
    },
    // {
    //     brand: "Sint Maarten",
    //     logo: "https://flagpedia.net/data/flags/w1160/sx.webp"
    // },
    {
        brand: "Slovakia",
        logo: "https://flagpedia.net/data/flags/w1160/sk.webp"
    },
    {
        brand: "Slovenia",
        logo: "https://flagpedia.net/data/flags/w1160/si.webp"
    },
    // {
    //     brand: "Solomon Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/sb.webp"
    // },
    {
        brand: "Somalia",
        logo: "https://flagpedia.net/data/flags/w1160/so.webp"
    },
    {
        brand: "South Africa",
        logo: "https://flagpedia.net/data/flags/w1160/za.webp"
    },
    // {
    //     brand: "South Georgia",
    //     logo: "https://flagpedia.net/data/flags/w1160/gs.webp"
    // },
    // {
    //     brand: "South Sudan",
    //     logo: "https://flagpedia.net/data/flags/w1160/ss.webp"
    // },
    {
        brand: "Spain",
        logo: "https://flagpedia.net/data/flags/w1160/es.webp"
    },
    {
        brand: "Sri Lanka",
        logo: "https://flagpedia.net/data/flags/w1160/lk.webp"
    },
    {
        brand: "Sudan",
        logo: "https://flagpedia.net/data/flags/w1160/sd.webp"
    },
    // {
    //     brand: "Suriname",
    //     logo: "https://flagpedia.net/data/flags/w1160/sr.webp"
    // },
    // {
    //     brand: "Svalbard and Jan Mayen",
    //     logo: "https://flagpedia.net/data/flags/w1160/sj.webp"
    // },
    {
        brand: "Sweden",
        logo: "https://flagpedia.net/data/flags/w1160/se.webp"
    },
    {
        brand: "Switzerland",
        logo: "https://flagpedia.net/data/flags/w1160/ch.webp"
    },
    {
        brand: "Syria",
        logo: "https://flagpedia.net/data/flags/w1160/sy.webp"
    },
    {
        brand: "Taiwan",
        logo: "https://flagpedia.net/data/flags/w1160/tw.webp"
    },
    // {
    //     brand: "Tajikistan",
    //     logo: "https://flagpedia.net/data/flags/w1160/tj.webp"
    // },
    {
        brand: "Tanzania",
        logo: "https://flagpedia.net/data/flags/w1160/tz.webp"
    },
    {
        brand: "Thailand",
        logo: "https://flagpedia.net/data/flags/w1160/th.webp"
    },
    // {
    //     brand: "Timor-Leste",
    //     logo: "https://flagpedia.net/data/flags/w1160/tl.webp"
    // },
    // {
    //     brand: "Togo",
    //     logo: "https://flagpedia.net/data/flags/w1160/tg.webp"
    // },
    // {
    //     brand: "Tokelau",
    //     logo: "https://flagpedia.net/data/flags/w1160/tk.webp"
    // },
    // {
    //     brand: "Tonga",
    //     logo: "https://flagpedia.net/data/flags/w1160/to.webp"
    // },
    // {
    //     brand: "Trinidad and Tobago",
    //     logo: "https://flagpedia.net/data/flags/w1160/tt.webp"
    // },
    {
        brand: "Tunisia",
        logo: "https://flagpedia.net/data/flags/w1160/tn.webp"
    },
    {
        brand: "Turkey",
        logo: "https://flagpedia.net/data/flags/w1160/tr.webp"
    },
    {
        brand: "Turkmenistan",
        logo: "https://flagpedia.net/data/flags/w1160/tm.webp"
    },
    // {
    //     brand: "Turks and Caicos Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/tc.webp"
    // },
    // {
    //     brand: "Tuvalu",
    //     logo: "https://flagpedia.net/data/flags/w1160/tv.webp"
    // },
    {
        brand: "Uganda",
        logo: "https://flagpedia.net/data/flags/w1160/ug.webp"
    },
    {
        brand: "Ukraine",
        logo: "https://flagpedia.net/data/flags/w1160/ua.webp"
    },
    {
        brand: "United Arab Emirates",
        logo: "https://flagpedia.net/data/flags/w1160/ae.webp"
    },
    {
        brand: "United Kingdom",
        logo: "https://flagpedia.net/data/flags/w1160/gb.webp"
    },
    {
        brand: "United States",
        logo: "https://flagpedia.net/data/flags/w1160/us.webp"
    },
    // {
    //     brand: "United States Minor Outlying Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/um.webp"
    // },
    {
        brand: "Uruguay",
        logo: "https://flagpedia.net/data/flags/w1160/uy.webp"
    },
    {
        brand: "Uzbekistan",
        logo: "https://flagpedia.net/data/flags/w1160/uz.webp"
    },
    // {
    //     brand: "Vanuatu",
    //     logo: "https://flagpedia.net/data/flags/w1160/vu.webp"
    // },
    {
        brand: "Vatican City",
        logo: "https://flagpedia.net/data/flags/w1160/va.webp"
    },
    {
        brand: "Venezuela",
        logo: "https://flagpedia.net/data/flags/w1160/ve.webp"
    },
    {
        brand: "Vietnam",
        logo: "https://flagpedia.net/data/flags/w1160/vn.webp"
    },
    // {
    //     brand: "British Virgin Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/vg.webp"
    // },
    // {
    //     brand: "United States Virgin Islands",
    //     logo: "https://flagpedia.net/data/flags/w1160/vi.webp"
    // },
    {
        brand: "Wales",
        logo: "https://flagpedia.net/data/flags/w1160/gb-wls.webp"
    },
    // {
    //     brand: "Wallis and Futuna",
    //     logo: "https://flagpedia.net/data/flags/w1160/wf.webp"
    // },
    // {
    //     brand: "Western Sahara",
    //     logo: "https://flagpedia.net/data/flags/w1160/eh.webp"
    // },
    {
        brand: "Yemen",
        logo: "https://flagpedia.net/data/flags/w1160/ye.webp"
    },
    {
        brand: "Zambia",
        logo: "https://flagpedia.net/data/flags/w1160/zm.webp"
    },
    {
        brand: "Zimbabwe",
        logo: "https://flagpedia.net/data/flags/w1160/zw.webp"
    }
];


const TOTAL_QUESTIONS = cars.length;

/* =========================
   STORAGE KEYS
========================= */

const STORAGE_KEYS = {
    usedCars: "carGame_usedCars",
    history: "carGame_history"
};


/* =========================
   GAME VARIABLES
========================= */

let questions = [];
let currentQuestion = 0;
let score = 0;

let answerChecked = false;
let scoreAdded = false;

// History الخاصة باللعبة الحالية
let currentGameHistory = [];


/* =========================
   ELEMENTS
========================= */

const carLogo =
    document.getElementById("carLogo");

const answerInput =
    document.getElementById("answerInput");

const checkBtn =
    document.getElementById("checkBtn");

const correctAnswer =
    document.getElementById("correctAnswer");

const answerText =
    document.getElementById("answerText");

const decisionArea =
    document.getElementById("decisionArea");

const rightBtn =
    document.getElementById("rightBtn");

const wrongBtn =
    document.getElementById("wrongBtn");

const nextBtn =
    document.getElementById("nextBtn");

const scoreElement =
    document.getElementById("score");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const progressBar =
    document.getElementById("progressBar");

const percentage =
    document.getElementById("percentage");

const gameArea =
    document.getElementById("gameArea");

const endScreen =
    document.getElementById("endScreen");

const finalScore =
    document.getElementById("finalScore");

const finalTotal =
    document.getElementById("finalTotal");

const message =
    document.getElementById("message");

const playAgain =
    document.getElementById("playAgain");

const historyList =
    document.getElementById("historyList");

const resetBtn =
    document.getElementById("resetBtn");


/* =========================
   SHUFFLE
========================= */

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


/* =========================
   USED CARS
========================= */

function getUsedCars() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.usedCars
            )
        ) || [];

    } catch (error) {

        console.error(
            "Error reading used cars:",
            error
        );

        return [];

    }

}


function saveUsedCars(usedCars) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.usedCars,
            JSON.stringify(usedCars)
        );

    } catch (error) {

        console.error(
            "Error saving used cars:",
            error
        );

    }

}


/* =========================
   GET SAVED HISTORY
========================= */

function getHistory() {

    try {

        const history =
            localStorage.getItem(
                STORAGE_KEYS.history
            );

        if (!history) {
            return [];
        }

        return JSON.parse(history);

    } catch (error) {

        console.error(
            "Error reading history:",
            error
        );

        return [];

    }

}


/* =========================
   SAVE HISTORY
========================= */

function saveHistory(history) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.history,
            JSON.stringify(history)
        );

    } catch (error) {

        console.error(
            "Error saving history:",
            error
        );

    }

}


/* =========================
   GET NEW QUESTIONS
========================= */

function getNewQuestions() {

    let usedCars = getUsedCars();

    if (usedCars.length >= cars.length) {

        usedCars = [];

        saveUsedCars([]);

    }

    const availableCars =
        cars.filter(
            car => !usedCars.includes(car.brand)
        );

    const shuffledCars =
        shuffle(availableCars);

    // استخدام كل العربيات المتاحة
    const selectedCars = shuffledCars;

    const newUsedCars = [
        ...usedCars,
        ...selectedCars.map(
            car => car.brand
        )
    ];

    saveUsedCars(newUsedCars);

    return selectedCars;
}


/* =========================
   START GAME
========================= */

function startGame() {

    questions =
        getNewQuestions();


    currentQuestion = 0;

    score = 0;

    answerChecked = false;

    scoreAdded = false;


    // مسح History اللعبة الحالية
    currentGameHistory = [];


    scoreElement.textContent =
        score;


    totalQuestionsElement.textContent =
        questions.length;


    finalTotal.textContent =
        questions.length;


    gameArea.classList.remove(
        "hidden"
    );


    endScreen.classList.add(
        "hidden"
    );


    showQuestion();


    // عرض History
    renderHistory();

}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

    answerChecked = false;

    scoreAdded = false;


    const question =
        questions[currentQuestion];


    // عرض اللوجو
    carLogo.src =
        question.logo;


    carLogo.alt =
        question.brand + " Logo";


    // رقم السؤال
    currentQuestionElement.textContent =
        currentQuestion + 1;


    // Progress
    const progress =
        (currentQuestion / questions.length) * 100;


    progressBar.style.width =
        `${progress}%`;


    percentage.textContent =
        `${Math.round(progress)}%`;


    // Reset input
    answerInput.value = "";

    answerInput.disabled = false;


    // Reset buttons
    checkBtn.style.display =
        "block";


    correctAnswer.classList.add(
        "hidden"
    );


    decisionArea.classList.add(
        "hidden"
    );


    nextBtn.style.display =
        "none";


    // Focus
    setTimeout(() => {

        answerInput.focus();

    }, 100);

}


/* =========================
   CHECK ANSWER
========================= */

checkBtn.addEventListener(
    "click",
    () => {

        if (answerChecked) {
            return;
        }


        answerChecked = true;


        const question =
            questions[currentQuestion];


        // عرض الإجابة الصحيحة
        answerText.textContent =
            question.brand;


        correctAnswer.classList.remove(
            "hidden"
        );


        // إظهار الاختيار
        decisionArea.classList.remove(
            "hidden"
        );


        // إخفاء Check
        checkBtn.style.display =
            "none";


        // منع تعديل الإجابة
        answerInput.disabled = true;

    }
);


/* =========================
   ENTER
========================= */

answerInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            checkBtn.click();

        }

    }
);


/* =========================
   ADD ANSWER TO HISTORY
========================= */

function addAnswerToHistory(isCorrect) {

    const question =
        questions[currentQuestion];


    const userAnswer =
        answerInput.value.trim();


    const historyItem = {

        question:
            currentQuestion + 1,

        brand:
            question.brand,

        userAnswer:
            userAnswer || "No answer",

        correct:
            isCorrect

    };


    currentGameHistory.push(
        historyItem
    );


    // تحديث الـHistory فوراً
    renderHistory();

}


/* =========================
   RIGHT
========================= */

rightBtn.addEventListener(
    "click",
    () => {

        if (scoreAdded) {
            return;
        }


        scoreAdded = true;


        // زيادة السكور
        score++;


        scoreElement.textContent =
            score;


        // إضافة للسجل
        addAnswerToHistory(true);


        // Next
        showNextButton();

    }
);


/* =========================
   WRONG
========================= */

wrongBtn.addEventListener(
    "click",
    () => {

        if (scoreAdded) {
            return;
        }


        scoreAdded = true;


        // لا نزود السكور


        // إضافة للسجل
        addAnswerToHistory(false);


        // Next
        showNextButton();

    }
);


/* =========================
   SHOW NEXT BUTTON
========================= */

function showNextButton() {

    decisionArea.classList.add(
        "hidden"
    );


    nextBtn.style.display =
        "block";


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextBtn.textContent =
            "See Result 🏆";

    } else {

        nextBtn.textContent =
            "Next →";

    }

}


/* =========================
   NEXT
========================= */

nextBtn.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            showEndScreen();

        } else {

            showQuestion();

        }

    }
);


/* =========================
   SAVE COMPLETED GAME
========================= */

function saveCompletedGame() {

    const history =
        getHistory();


    const gameResult = {

        score:
            score,

        total:
            questions.length,

        date:
            new Date().toLocaleString(),

        answers:
            [...currentGameHistory]

    };


    history.unshift(
        gameResult
    );


    // الاحتفاظ بآخر 20 لعبة
    if (history.length > 20) {

        history.pop();

    }


    saveHistory(history);

}


/* =========================
   END SCREEN
========================= */

function showEndScreen() {

    gameArea.classList.add(
        "hidden"
    );


    endScreen.classList.remove(
        "hidden"
    );


    // Final Score
    finalScore.textContent =
        score;


    finalTotal.textContent =
        questions.length;


    // Progress
    progressBar.style.width =
        "100%";


    percentage.textContent =
        "100%";


    // النسبة
    const result =
        (score / questions.length) * 100;


    // الرسالة
    if (result === 100) {

        message.textContent =
            "🔥 Perfect! You're a car expert!";

    } else if (result >= 80) {

        message.textContent =
            "🏎️ Excellent! You really know cars!";

    } else if (result >= 50) {

        message.textContent =
            "👍 Good job! Keep going!";

    } else {

        message.textContent =
            "😅 Try again and improve your score!";

    }


    // حفظ اللعبة كاملة
    saveCompletedGame();


    // تحديث History
    renderHistory();

}


/* =========================
   RENDER HISTORY
========================= */

function renderHistory() {

    historyList.innerHTML = "";


    /*
        لو مفيش إجابات
        في اللعبة الحالية
        ومفيش ألعاب قديمة
    */

    const savedGames =
        getHistory();


    if (
        currentGameHistory.length === 0 &&
        savedGames.length === 0
    ) {

        historyList.innerHTML = `
            <div class="history-empty">
                No games played yet.
            </div>
        `;

        return;

    }


    /* =========================
       CURRENT GAME
    ========================= */

    if (currentGameHistory.length > 0) {

        const currentTitle =
            document.createElement("div");


        currentTitle.className =
            "history-current-title";


        currentTitle.innerHTML = `
            🎮 Current Game
        `;


        historyList.appendChild(
            currentTitle
        );


        currentGameHistory.forEach(
            (game) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "history-item";


                const status =
                    game.correct
                        ? "✅ Correct"
                        : "❌ Wrong";


                const statusClass =
                    game.correct
                        ? "correct-history"
                        : "wrong-history";


                item.innerHTML = `

                    <div>

                        <div class="history-score">

                            ${game.question}.
                            ${game.brand}

                        </div>

                        <div class="history-date">

                            Your answer:
                            <strong>
                                ${escapeHTML(
                    game.userAnswer
                )}
                            </strong>

                        </div>

                    </div>

                    <div class="${statusClass}">

                        ${status}

                    </div>

                `;


                historyList.appendChild(
                    item
                );

            }
        );


        // Current score
        const currentScore =
            document.createElement(
                "div"
            );


        currentScore.className =
            "current-history-score";


        currentScore.innerHTML = `

            <strong>
                Current Score:
            </strong>

            ${score} / ${currentGameHistory.length}

        `;


        historyList.appendChild(
            currentScore
        );

    }


    /* =========================
       PREVIOUS GAMES
    ========================= */

    if (savedGames.length > 0) {

        const previousTitle =
            document.createElement(
                "div"
            );


        previousTitle.className =
            "history-current-title";


        previousTitle.innerHTML = `
            📜 Previous Games
        `;


        historyList.appendChild(
            previousTitle
        );


        savedGames.forEach(
            (game, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "history-item";


                const pct =
                    Math.round(
                        (
                            game.score /
                            game.total
                        ) * 100
                    );


                let color;


                if (pct === 100) {

                    color =
                        "#2ecc71";

                } else if (pct >= 80) {

                    color =
                        "#00c6ff";

                } else if (pct >= 50) {

                    color =
                        "#f39c12";

                } else {

                    color =
                        "#e74c3c";

                }


                item.innerHTML = `

                    <div>

                        <div
                            class="history-score"
                            style="color: ${color}"
                        >

                            Game #${savedGames.length - index}

                            —
                            ${game.score}
                            /
                            ${game.total}

                        </div>


                        <div class="history-date">

                            ${game.date}

                        </div>

                    </div>


                    <div class="history-number">

                        ${pct}%

                    </div>

                `;


                historyList.appendChild(
                    item
                );

            }
        );

    }

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================
   PLAY AGAIN
========================= */

playAgain.addEventListener(
    "click",
    () => {

        startGame();

    }
);


/* =========================
   RESET HISTORY
========================= */

resetBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to reset history?"
            );


        if (!confirmed) {
            return;
        }


        // مسح الألعاب القديمة
        localStorage.removeItem(
            STORAGE_KEYS.history
        );


        // مسح History اللعبة الحالية
        currentGameHistory = [];


        // تحديث الشاشة
        renderHistory();

    }
);


/* =========================
   INITIALIZE
========================= */

renderHistory();

startGame();