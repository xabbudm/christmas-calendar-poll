import React, { useState } from 'react';
import { Gift, Plus, Trash2, RefreshCw, Eye, EyeOff } from 'lucide-react';

const ChristmasCalendarPoll = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [stage1Results, setStage1Results] = useState([]);
  const [stage2Results, setStage2Results] = useState([]);
  const [visibleGivingDays, setVisibleGivingDays] = useState({});
  const [pollStarted, setPollStarted] = useState(false);

  const addFamilyMember = () => {
    if (newMemberName.trim() && familyMembers.length < 6) {
      setFamilyMembers([...familyMembers, newMemberName.trim()]);
      setNewMemberName('');
      setPollStarted(false);
    }
  };

  const removeFamilyMember = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
    setPollStarted(false);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startPoll = () => {
    if (familyMembers.length < 2 || familyMembers.length > 6) {
      alert('Please add 2 to 6 family members!');
      return;
    }

    const numMembers = familyMembers.length;
    const daysPerPerson = Math.floor(24 / numMembers);

    // Stage 1: Distribute days randomly among members
    const days = Array.from({ length: 24 }, (_, i) => i + 1);
    const shuffledDays = shuffleArray(days);
    
    const stage1 = familyMembers.map((member, index) => ({
      name: member,
      receivingDays: shuffledDays.slice(index * daysPerPerson, (index + 1) * daysPerPerson).sort((a, b) => a - b)
    }));
    setStage1Results(stage1);

    // Stage 2: Assign giving days ensuring no one gives on their own receiving days
    // This is a random drawing WITHOUT replacement - each day can only be assigned once
    const stage2 = familyMembers.map((member, index) => ({
      name: member,
      givingDays: [],
      canGiveOn: days.filter(day => !stage1[index].receivingDays.includes(day))
    }));

    // Track how many days each member still needs
    const membersNeed = familyMembers.map(() => daysPerPerson);

    // Create a shuffled pool of all 24 days for random drawing
    const dayPool = shuffleArray([...days]);
    
    // Assign days from the pool to members, ensuring each day is only assigned once
    // and each member gets exactly their required number of days
    for (const day of dayPool) {
      // Find members who still need days and can give on this day
      const eligibleIndices = stage2
        .map((member, idx) => ({ member, idx }))
        .filter(({ member, idx }) => membersNeed[idx] > 0 && member.canGiveOn.includes(day));
      
      if (eligibleIndices.length > 0) {
        // Prioritize members who need the most days to ensure balanced distribution
        const maxNeed = Math.max(...eligibleIndices.map(({ idx }) => membersNeed[idx]));
        const mostNeedyMembers = eligibleIndices.filter(({ idx }) => membersNeed[idx] === maxNeed);
        
        // Randomly pick one from the most needy members
        const selected = mostNeedyMembers[Math.floor(Math.random() * mostNeedyMembers.length)];
        stage2[selected.idx].givingDays.push(day);
        membersNeed[selected.idx]--;
      }
    }

    // Verify that all members got their required days
    const allMembersComplete = stage2.every(member => member.givingDays.length === daysPerPerson);
    if (!allMembersComplete) {
      // This shouldn't happen with proper constraints, but if it does, retry
      alert('Assignment failed. Please try again.');
      return;
    }

    // Sort the giving days for each member and remove the helper property
    stage2.forEach(member => {
      member.givingDays.sort((a, b) => a - b);
      delete member.canGiveOn;
    });

    setStage2Results(stage2);
    setVisibleGivingDays({});
    setPollStarted(true);
  };

  const toggleGivingDaysVisibility = (memberIndex) => {
    setVisibleGivingDays(prev => ({
      ...prev,
      [memberIndex]: !prev[memberIndex]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gift className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-green-800">Christmas Calendar Poll</h1>
            <Gift className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-gray-600">Organize your family's advent calendar gift exchange</p>
        </div>

        {/* Top Section: Family Member Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addFamilyMember()}
                placeholder="Enter family member name"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none"
                disabled={familyMembers.length >= 6}
              />
              <button
                onClick={addFamilyMember}
                disabled={familyMembers.length >= 4}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>
            <button
              onClick={startPoll}
              disabled={familyMembers.length < 2}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 justify-center transition-colors font-semibold"
            >
              <RefreshCw className="w-5 h-5" />
              {pollStarted ? 'Restart Poll' : 'Start Poll'}
            </button>
          </div>

          {familyMembers.length > 0 && (
            <div className="space-y-2">
              {familyMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="font-medium text-gray-800">{member}</span>
                  <button
                    onClick={() => removeFamilyMember(index)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {familyMembers.length < 2 && (
            <p className="text-sm text-gray-500 mt-3">
              Add at least 2 family members to start the poll (maximum 6)
            </p>
          )}
        </div>

        {/* Stage 1: Receiving Days */}
        {pollStarted && stage1Results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Stage 1: Receiving Days
            </h2>
            <p className="text-gray-600 mb-4">Days when each person receives a gift</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage1Results.map((member, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-lg border-2 border-green-200">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">{member.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.receivingDays.map((day) => (
                      <div
                        key={day}
                        className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold shadow-md"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2: Giving Days */}
        {pollStarted && stage2Results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6" />
              Stage 2: Giving Days
            </h2>
            <p className="text-gray-600 mb-4">Days when you prepare gifts (click "View" to reveal your days)</p>
            <div className="space-y-4">
              {stage2Results.map((member, memberIndex) => {
                const isVisible = visibleGivingDays[memberIndex];
                
                return (
                  <div key={memberIndex} className="p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border-2 border-red-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                      <button
                        onClick={() => toggleGivingDaysVisibility(memberIndex)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
                      >
                        {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        {isVisible ? 'Hide' : 'View'}
                      </button>
                    </div>
                    {isVisible && (
                      <div className="flex flex-wrap gap-2">
                        {member.givingDays.map((day) => (
                          <div
                            key={day}
                            className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold shadow-md"
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    )}
                    {!isVisible && (
                      <div className="h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 font-medium">Click "View" to see your giving days</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChristmasCalendarPoll;