<template>
    <section class="section">
      <div class="columns">
        <div class="column is-two-thirds">
          <h2 class="title is-2">
            Landfast Sea Ice
          </h2>
          <div class="content is-size-5">
            <p>
              Landfast ice is sea ice that is mostly stationary and attached to land. In the dataset presented here landfast sea ice is defined as being contiguous to the coast and lacking detectable motion for approximately 20 consecutive days (<a href="https://seaice.alaska.edu/gi/publications/mahoney/Mahoney_2005_POAC_DefiningLFI.pdf">Mahoney et al. 2005</a>). Landfast sea ice is an integral component of Arctic coastal systems and hosts numerous geological and biological processes as well as human activities.
            </p>
            </div>
        <h4 class="title is-4">Summarizing ice edge data</h4>
        <div class="content is-size-5">
          <p>
            This data visualization summarizes the seaward landfast ice edge (SLIE) for the Beaufort Sea region. Each month of the ice season (October through July) is summarized over three ice eras (1996-2005, 2005-2014, 2014-2023) using the minimum, maximum, median, and mean extent of SLIE from the coastline. The darkest shade of blue indicates the minimum SLIE extent, the lighter blue the median, and the lightest blue the maximum. The black line is the mean SLIE extent for the era.
          </p>
        </div>
        <h4 class="title is-4">The consequences of a changing ice regime</h4>
        <div class="content is-size-5">
          <p>
            Landfast sea ice is diminishing as amplified climatic change in the Arctic increases ocean and air temperatures. [<strong> needed narrative goes here</strong>]
          </p>
        </div>
        <h4 class="title is-4">Bringing diverse data together</h4>
        <div class="content is-size-5">
          <p>
            The data explored here are a novel assemblage of several data sources including satellite imagery, ice chart products, and expert interpretations. Two synthetic aperture radar (SAR) platforms (RADARSAT-1 and EnviSAT) were leveraged to classify landfast sea ice between 1995 and 2008. RADARSAT-1 data were acquired using the moderate-resolution ScanSAR operation mode of the SAR sensor using the C-Band (5.3 GHz), 5.6 cm wavelength, HH polarized microwave frequency. Landfast ice has a distinct backscatter signature compared to surrounding pack ice, land, or open water which enables broad scale classification of landfast sea ice. Several agencies publish daily charts of sea ice chart concentrations for navigational purposes that can also be used to infer the presence or absence of landfast sea ice. Such charts are produced by fusing several different data sources under the guidance of sea ice experts. Chart data sources include the <a href="https://www.weather.gov/afc/ice">Alaska Sea Ice Program (ASIP)</a> and the G10013 SIGID-3 Arctic Ice Charts produced by the <a href="https://usicecenter.gov/">National Ice Center (NIC)</a>.
          </p>
        </div>
        </div>
      </div>
    <Bios :people="['Hajo Eicken', 'Andy Mahoney']" />
    </section>
  </template>