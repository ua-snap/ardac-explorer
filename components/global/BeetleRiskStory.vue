<script lang="ts" setup>
const snowpackInput = defineModel('snowpack', { default: 'medium' })
const scenarioInput = defineModel('scenario', { default: 'rcp85' })
const modelInput = defineModel('model', { default: 'CCSM4' })
const eraInput = defineModel('era', { default: '2070-2099' })

const scenarioLabels: Record<string, string> = {
  rcp45: 'RCP 4.5',
  rcp85: 'RCP 8.5',
}

const models: string[] = ['CCSM4', 'GFDL-ESM2M', 'HadGEM2-ES', 'MRI-CGCM3']
const eras: string[] = ['2010-2039', '2040-2069', '2070-2099']

const snowpackLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
}

const dataLabels: Record<string, string> = {
  '1 to 1': 'High to High',
  '2 to 2': 'Minimal to Minimal',
  '1 to 2': 'High to Minimal',
  '2 to 3': 'Minimal to None',
  '1 to 3': 'High to None',
}

const data: any = {
  CCSM4: {
    rcp45: {
      '2010-2039': {
        low: {
          '1 to 1': '586512',
          '2 to 2': '25488',
          '1 to 2': '2880',
          '2 to 3': '576',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '561600',
          '2 to 2': '31248',
          '1 to 2': '5904',
          '2 to 3': '1008',
          '1 to 3': '144',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '574416',
          '2 to 2': '18864',
          '1 to 2': '14688',
          '2 to 3': '8208',
          '1 to 3': '288',
        },
        medium: {
          '1 to 1': '537984',
          '2 to 2': '28224',
          '1 to 2': '27648',
          '2 to 3': '18000',
          '1 to 3': '2016',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '558576',
          '2 to 2': '6912',
          '1 to 2': '23328',
          '2 to 3': '20880',
          '1 to 3': '7488',
        },
        medium: {
          '1 to 1': '351648',
          '2 to 2': '11232',
          '1 to 2': '176256',
          '2 to 3': '38160',
          '1 to 3': '39744',
        },
      },
    },
    rcp85: {
      '2010-2039': {
        low: {
          '1 to 1': '587232',
          '2 to 2': '22032',
          '1 to 2': '2160',
          '2 to 3': '432',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '562176',
          '2 to 2': '29088',
          '1 to 2': '5472',
          '2 to 3': '720',
          '1 to 3': '0',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '559152',
          '2 to 2': '5328',
          '1 to 2': '21456',
          '2 to 3': '22464',
          '1 to 3': '8784',
        },
        medium: {
          '1 to 1': '416160',
          '2 to 2': '11808',
          '1 to 2': '119952',
          '2 to 3': '36432',
          '1 to 3': '31536',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '465840',
          '2 to 2': '0',
          '1 to 2': '88416',
          '2 to 3': '27792',
          '1 to 3': '35136',
        },
        medium: {
          '1 to 1': '122544',
          '2 to 2': '288',
          '1 to 2': '199008',
          '2 to 3': '49104',
          '1 to 3': '246096',
        },
      },
    },
  },
  'GFDL-ESM2M': {
    rcp45: {
      '2010-2039': {
        low: {
          '1 to 1': '587376',
          '2 to 2': '23904',
          '1 to 2': '2016',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '563616',
          '2 to 2': '30384',
          '1 to 2': '4032',
          '2 to 3': '0',
          '1 to 3': '0',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '588240',
          '2 to 2': '22896',
          '1 to 2': '1152',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '563760',
          '2 to 2': '29664',
          '1 to 2': '3888',
          '2 to 3': '0',
          '1 to 3': '0',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '588240',
          '2 to 2': '19584',
          '1 to 2': '1152',
          '2 to 3': '2304',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '537264',
          '2 to 2': '31968',
          '1 to 2': '30240',
          '2 to 3': '2880',
          '1 to 3': '144',
        },
      },
    },
    rcp85: {
      '2010-2039': {
        low: {
          '1 to 1': '589392',
          '2 to 2': '15408',
          '1 to 2': '0',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '567648',
          '2 to 2': '17712',
          '1 to 2': '0',
          '2 to 3': '0',
          '1 to 3': '0',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '588384',
          '2 to 2': '22752',
          '1 to 2': '1008',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '537408',
          '2 to 2': '34704',
          '1 to 2': '30096',
          '2 to 3': '3024',
          '1 to 3': '144',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '580032',
          '2 to 2': '21312',
          '1 to 2': '9216',
          '2 to 3': '6480',
          '1 to 3': '144',
        },
        medium: {
          '1 to 1': '424080',
          '2 to 2': '28512',
          '1 to 2': '140112',
          '2 to 3': '16416',
          '1 to 3': '3456',
        },
      },
    },
  },
  'HadGEM2-ES': {
    rcp45: {
      '2010-2039': {
        low: {
          '1 to 1': '582912',
          '2 to 2': '26640',
          '1 to 2': '6480',
          '2 to 3': '288',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '544752',
          '2 to 2': '42048',
          '1 to 2': '22752',
          '2 to 3': '2592',
          '1 to 3': '144',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '573264',
          '2 to 2': '10368',
          '1 to 2': '14688',
          '2 to 3': '16848',
          '1 to 3': '1440',
        },
        medium: {
          '1 to 1': '461952',
          '2 to 2': '20160',
          '1 to 2': '94608',
          '2 to 3': '28224',
          '1 to 3': '11088',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '561888',
          '2 to 2': '3168',
          '1 to 2': '24336',
          '2 to 3': '24624',
          '1 to 3': '3168',
        },
        medium: {
          '1 to 1': '361584',
          '2 to 2': '10512',
          '1 to 2': '176544',
          '2 to 3': '35424',
          '1 to 3': '29520',
        },
      },
    },
    rcp85: {
      '2010-2039': {
        low: {
          '1 to 1': '583632',
          '2 to 2': '26928',
          '1 to 2': '5760',
          '2 to 3': '432',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '545904',
          '2 to 2': '41616',
          '1 to 2': '21744',
          '2 to 3': '2304',
          '1 to 3': '0',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '557712',
          '2 to 2': '2304',
          '1 to 2': '21744',
          '2 to 3': '25488',
          '1 to 3': '9936',
        },
        medium: {
          '1 to 1': '384048',
          '2 to 2': '9072',
          '1 to 2': '153360',
          '2 to 3': '36864',
          '1 to 3': '30240',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '538128',
          '2 to 2': '720',
          '1 to 2': '27504',
          '2 to 3': '27072',
          '1 to 3': '23760',
        },
        medium: {
          '1 to 1': '233712',
          '2 to 2': '1872',
          '1 to 2': '169776',
          '2 to 3': '46368',
          '1 to 3': '164160',
        },
      },
    },
  },
  'MRI-CGCM3': {
    rcp45: {
      '2010-2039': {
        low: {
          '1 to 1': '588528',
          '2 to 2': '19584',
          '1 to 2': '864',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '561888',
          '2 to 2': '31824',
          '1 to 2': '5760',
          '2 to 3': '144',
          '1 to 3': '0',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '586512',
          '2 to 2': '20880',
          '1 to 2': '2880',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '499536',
          '2 to 2': '32112',
          '1 to 2': '68112',
          '2 to 3': '432',
          '1 to 3': '0',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '578736',
          '2 to 2': '23184',
          '1 to 2': '10656',
          '2 to 3': '3744',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '500688',
          '2 to 2': '34560',
          '1 to 2': '57888',
          '2 to 3': '8208',
          '1 to 3': '9072',
        },
      },
    },
    rcp85: {
      '2010-2039': {
        low: {
          '1 to 1': '587808',
          '2 to 2': '24912',
          '1 to 2': '1584',
          '2 to 3': '0',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '562608',
          '2 to 2': '34416',
          '1 to 2': '5040',
          '2 to 3': '144',
          '1 to 3': '0',
        },
      },
      '2040-2069': {
        low: {
          '1 to 1': '576720',
          '2 to 2': '26640',
          '1 to 2': '12672',
          '2 to 3': '288',
          '1 to 3': '0',
        },
        medium: {
          '1 to 1': '525888',
          '2 to 2': '34992',
          '1 to 2': '35712',
          '2 to 3': '5760',
          '1 to 3': '6048',
        },
      },
      '2070-2099': {
        low: {
          '1 to 1': '568944',
          '2 to 2': '12960',
          '1 to 2': '18576',
          '2 to 3': '14832',
          '1 to 3': '1872',
        },
        medium: {
          '1 to 1': '464688',
          '2 to 2': '17856',
          '1 to 2': '77472',
          '2 to 3': '29520',
          '1 to 3': '25488',
        },
      },
    },
  },
}
</script>

<template>
  <section class="section">
    <div class="content is-size-5">
      <h3 class="title is-3">Climate Protection from Spruce Beetles, by Bob</h3>
      <p class="mb-6"></p>
      <h4>Introduction</h4>
      <p>
        Spruce beetles are small insects that play a significant role in
        Alaska's forests, infesting white spruce, Sitka spruce, and Lutz spruce.
        These outbreaks can cause substantial damage to forest ecosystems and
        have economic repercussions. In recent years, the frequency and severity
        of spruce beetle outbreaks in Alaska have increased, prompting
        researchers to delve deeper into understanding the factors influencing
        these outbreaks.
      </p>
      <h4>The Beetle Life Cycle and Climate Connection</h4>
      <p>
        Spruce beetles have a lifecycle closely tied to climate conditions.
        Adult beetles typically fly to new trees in the spring, where females
        lay eggs. The timing of beetle flight is linked to temperature, with
        flight occurring when temperatures reach approximately 16°C or warmer.
        Once hatched, larvae develop over the summer, with some maturing into
        adults by the end of the season. Maturation within a single summer
        season termed univoltinism, depends on the accumulation of heat during
        the summer months. Beetles that mature in a single summer (univoltine)
        have a higher chance of survival compared to those that overwinter as
        larvae (semivoltine), not only because they can breed sooner, but also
        because over-winter predation of larvae by woodpeckers is high. Beetles
        are also moderated by cold temperatures. Rapid cooling during the fall
        or extreme cold temperatures during winter can limit beetle survival.
        Understanding these climate factors is essential for predicting and
        mitigating outbreaks.
      </p>

      <div>
        <img src="assets/images/beetle_voltinism.png" />
      </div>

      <h4>Modeling Spruce Beetle Outbreaks</h4>

      <p>
        To better understand and predict spruce beetle outbreaks, researchers
        developed a comprehensive model that incorporates various climate
        factors and beetle life cycle stages. The model assesses the risk of
        outbreaks across different time periods, considering historical climate
        data, climate projections, and beetle population dynamics. By
        calibrating the model with observed outbreak patterns, researchers
        categorized climate protection levels and identified regions that might
        lose past climate-linked protections from outbreaks.
      </p>
      <h4>Implications for Forest Management</h4>
      <p>
        Understanding the factors driving spruce beetle outbreaks is essential
        for effective forest management and conservation efforts. By identifying
        areas that may become more vulnerable, forest managers can implement
        proactive measures to mitigate beetle infestations, such as targeted
        tree removal, forest thinning, and monitoring programs. These management
        practices can help maintain the health and resilience of Alaska's
        forests in the face of changing climate conditions.
      </p>
      <h4>Conclusion</h4>
      <p>
        Spruce beetle outbreaks pose significant challenges to Alaska's forests,
        but through interdisciplinary research and advanced modeling techniques,
        scientists are gaining valuable insights into the complex interactions
        between climate, beetle populations, and forest ecosystems. By applying
        this knowledge, stakeholders can work towards sustainable forest
        management practices that help protect Alaska's valuable spruce forests
        for future generations.
      </p>
    </div>

    <div class="content is-size-5">
      <h3 class="title is-3">Climate Protection from Spruce Beetles</h3>
      <div class="parameter mb-5">
        <label for="model" class="label">Model:</label>
        <div class="select mr-3">
          <select id="model" v-model="modelInput">
            <option v-for="model in models" :value="model">
              {{ model }}
            </option>
          </select>
        </div>
      </div>
      <div class="parameter mb-5">
        <label for="scenario" class="label">Scenario:</label>
        <div class="select mr-3">
          <select id="scenario" v-model="scenarioInput">
            <option
              v-for="scenario in Object.keys(scenarioLabels)"
              :value="scenario"
            >
              {{ scenarioLabels[scenario] }}
            </option>
          </select>
        </div>
      </div>
      <div class="parameter mb-5 mr-3">
        <label for="era" class="label">Era:</label>
        <div class="select">
          <select id="era" v-model="eraInput">
            <option v-for="era in eras" :value="era">
              {{ era }}
            </option>
          </select>
        </div>
      </div>
      <div class="parameter">
        <label for="snowpack" class="label">Snowpack:</label>
        <div class="select mb-5">
          <select id="snowpack" v-model="snowpackInput">
            <option
              v-for="snowpack in Object.keys(snowpackLabels)"
              :value="snowpack"
            >
              {{ snowpackLabels[snowpack] }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <h4 class="title is-4">
      Transitions in climate protection from spruce beetle outbreaks
    </h4>
    <table class="is-size-5">
      <tr v-for="key in Object.keys(dataLabels)">
        <th>
          {{ dataLabels[key] }}
        </th>
        <td>
          {{ data[modelInput][scenarioInput][eraInput][snowpackInput][key] }}
          km<sup>2</sup>
        </td>
      </tr>
    </table>
  </section>
</template>

<style lang="scss" scoped>
.parameter {
  display: inline-block;
  select {
    background-color: $white-lighter;
  }
}

th {
  min-width: 200px;
}
</style>
