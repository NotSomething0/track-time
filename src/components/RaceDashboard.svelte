<script lang="ts">
  import DashboardHeader from "./DashboardHeader.svelte";
  import LiveFocusPanel from "./LiveFocusPanel.svelte";
  import UpcomingTimeline from "./UpcomingTimeline.svelte";
  import InsightsSection from "./InsightsSection.svelte";

  let followedSeries = $state(['F1', 'WEC', 'IMSA']);

  let races = $state([
    { id: 1, series: 'F1', event: 'Monaco Grand Prix', date: '2026-05-24T13:00:00', alarm: false },
    { id: 2, series: 'WEC', event: '24 Hours of Le Mans', date: '2026-06-13T14:00:00', alarm: true },
    { id: 3, series: 'IMSA', event: 'Six Hours of The Glen', date: '2026-06-21T10:00:00', alarm: false }
  ]);

  let upcomingRaces = $derived(
    races.filter(r => followedSeries.includes(r.series))
  );

  function toggleAlarm(id: number) {
    const race = races.find(r => r.id === id);
    if (race) race.alarm = !race.alarm;
  }
</script>

<div class="space-y-8">
  <DashboardHeader {followedSeries} {upcomingRaces} />
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <LiveFocusPanel races={upcomingRaces} on:toggleAlarm={(e) => toggleAlarm(e.detail)} />
    <UpcomingTimeline races={upcomingRaces} on:toggleAlarm={(e) => toggleAlarm(e.detail)} />
  </div>

  <InsightsSection />
</div>