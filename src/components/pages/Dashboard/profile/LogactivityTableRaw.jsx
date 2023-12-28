export default function Row({ logactivity, index }) {

  return (
    <>
      <tr className="border-bottom">
        <th scope="row">{index + 1}</th>
        <td>{logactivity.module}</td>
        <td>{logactivity.description}</td>
        <td>{logactivity.createdAt}</td>
      </tr>
    </>
  );
}
