package info.nemhauser.turmoil.engine.world.map.graph;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;

public class Instance
{
	/**
	 * TODO: perhaps should be stored and not recreated all the time?
	 *
	 * @return DefaultUndirectedGraph
	 */
	public static DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = new DefaultUndirectedGraph<>(DefaultEdge.class);

		int maxWidth = 10;
		int maxHeight = 8;

		for (int i = 1; i <= maxWidth; i++)
		{
			for (int j = 1; j <= maxHeight; j++)
			{
				String vertex = i + "-" + j;
				graph.addVertex(vertex);

				if (j > 1)
				{
					String vertexAbove = i + "-" + (j-1);
					graph.addEdge(vertexAbove, vertex);

					if (i > 1 && i % 2 != 0)
					{
						String vertexDiagonalRight = (i-1) + "-" + (j-1);
						graph.addEdge(vertexDiagonalRight, vertex);
					}
				}

				if (i > 1)
				{
					String vertexBeside = (i-1) + "-" + j;
					graph.addEdge(vertexBeside, vertex);

					if (i % 2 == 0 && j < maxHeight)
					{
						String vertexDiagonalLeft = (i-1) + "-" + (j+1);
						graph.addEdge(vertexDiagonalLeft, vertex);
					}
				}
			}
		}

		return graph;
	}
}
