<script lang="ts">
    import { onMount } from 'svelte';
    
    let weeks: any[] = $state([]);
    
    onMount(async () => {
        try {
            const res = await fetch('/api/github');
            if (!res.ok) {
                console.error('Failed to fetch github contributions', await res.json());
                return;
            }
            const data = await res.json();
            if (data.data && data.data.user) {
                weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
            }
        } catch (e) {
            console.error('Error in fetching github contributions', e);
        }
    });
</script>

<div class="flex flex-col gap-4 w-full py-10 px-4 max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-4">
        Github Contributions
    </h2>

    <div class="flex gap-1 overflow-x-auto pb-4 no-scrollbar">
        {#each weeks as week}
            <div class="flex flex-col gap-1">
                {#each week.contributionDays as day}
                    <!-- Render each day block, using dynamic colors based on contribution count -->
                    <div 
                        class="w-3 h-3 rounded-sm transition-colors duration-300
                            {day.contributionCount === 0 ? 'bg-slate-100 dark:bg-slate-800' :
                             day.contributionCount < 3 ? 'bg-emerald-200 dark:bg-emerald-900' :
                             day.contributionCount < 6 ? 'bg-emerald-400 dark:bg-emerald-700' :
                             day.contributionCount < 9 ? 'bg-emerald-600 dark:bg-emerald-500' :
                             'bg-emerald-800 dark:bg-emerald-400'}"
                        title="{day.contributionCount} contributions on {day.date}"
                    ></div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>
