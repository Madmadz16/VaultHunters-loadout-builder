interface Stat {
	name: string;
	power: string;
}

interface StatsProps {
	stats: Stat[];
}

const Stats = ({ stats }: StatsProps) => {
	return (
		<>
			<h1>Stats</h1>
			{stats.length === 0 && <p>No stat found</p>}
			<ul className="list-group">
				{stats.map((stat, idx) => (
					<li key={idx} className="list-group-item d-flex justify-content-between">
						<span>{stat.name}</span>
						<span>{stat.power}</span>
					</li>
				))}
			</ul>
		</>
	);
};

export default Stats;
